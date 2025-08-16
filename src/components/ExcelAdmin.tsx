// @ts-nocheck
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { ref, get, set } from "firebase/database";
import { database, storage } from "@/Services/Firebase.config";
import { useFirebase } from "@/Services/context";
import { Button } from "./ui/button";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
export const ExportProductDataToExcel = () => {
  const { products } = useFirebase();
  const [GeneralMaster,setGeneralMaster]=useState();

  useEffect(()=>{
    const getUom=async()=>{
                    const orderRef = ref(database, `MLC/GeneralMaster`);
                        const snapshot = await get(orderRef);
                        setGeneralMaster(snapshot.val())
                        // return snapshot.exists() ?  : null;
             }
             getUom();
  },[])

  if(products.length<=0)
  {
    return;
  }
  console.log(products);
  console.log(GeneralMaster);
  const exportToExcel = () => {
    if (!products || products.length === 0) return;

   

    // Sort products by sortingOrder (default to 0 if missing)
    const sortedProducts = [...products].sort(
      (a, b) => (a.sortingOrder || 0) - (b.sortingOrder || 0)
    );

    // Prepare data for Excel
    const data = sortedProducts.map((p, index) => ({
      "S.No": index + 1,
      "Product Id": p.productId || p.id || "",
      "Product Name": p.productName || "",
      "Category Name": p.CategoryName || "",
      "Before Discount Price": p.beforeDiscPrice || 0,
      "Discount %": p.discPerc || 0,
      "Sales Price": p.salesPrice || 0,
      "Per Unit": p.per || "",
      "Unit-uomid": p.uom || "",
      "Unit-[uom]": GeneralMaster.UOM[p.uom].generalName || "",
      "Tag Name": p.tag || "",
      "Contains": p.contains || "",
      "Sorting Order": p.sortingorder || "",
      "Active": p.active ? "Yes" : "No",
    }));

    // Create workbook
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // Export file
    XLSX.writeFile(wb, "Products.xlsx");
  };

  return <Button onClick={exportToExcel}>Export Products</Button>;
};

export const ImportProductDataFromExcel = () => {
  const { Categories, products } = useFirebase();
  const [generalMaster, setGeneralMaster] = useState();
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({}); // track per-cell uploading state

  useEffect(() => {
    const getUom = async () => {
      const orderRef = ref(database, `MLC/GeneralMaster`);
      const snapshot = await get(orderRef);
      setGeneralMaster(snapshot.val());
    };
    getUom();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const parsedRows = jsonData.map((row) => {
        const fullRow = {};
        headers.forEach((header) => {
          fullRow[header] = row[header] ?? "";
        });
        return {
          ...fullRow,
          _image1File: null,
          _image2File: null,
        };
      });

      setRows(parsedRows);
      validateRows(parsedRows);
    };

    reader.readAsArrayBuffer(file);
  };

  const requiredFields = [
    "Product Id",
    "Product Name",
    "Category Name",
    "Unit-[uom]",
  ];

  const validateRows = (data) => {
    const newErrors = {};
    const newWarnings = {};

    data.forEach((row, idx) => {
      newErrors[idx] = {};
      newWarnings[idx] = {};

      requiredFields.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === "") {
          newErrors[idx][field] = `${field} is required`;
        }
      });

      if (row["Category Name"]) {
        if (
          !Object.values(Categories).some(
            (cat) => cat.generalName === row["Category Name"]
          )
        ) {
          newErrors[idx]["Category Name"] = "Invalid category";
        }
      }

      if (row["Unit-[uom]"] && row["Unit-uomid"]) {
        if (
          generalMaster?.UOM?.[row["Unit-uomid"]]?.generalName !==
          row["Unit-[uom]"]
        ) {
          newErrors[idx]["Unit-[uom]"] = "Invalid UOM";
        }
      }

      if (!row.image1 && !row._image1File) {
        newWarnings[idx]["image1"] = "Image1 missing";
      }
      if (!row.image2 && !row._image2File) {
        newWarnings[idx]["image2"] = "Image2 missing";
      }

      if (row["Product Id"] && products) {
        const exists = Object.values(products).some(
          (p) => p["productId"]?.toString() === row["Product Id"].toString()
        );
        if (exists) {
          newWarnings[idx]["Product Id"] =
            "⚠️ Product already exists in DB. Will be updated.";
        }
      }

      if (Object.keys(newErrors[idx]).length === 0) delete newErrors[idx];
      if (Object.keys(newWarnings[idx]).length === 0) delete newWarnings[idx];
    });

    setErrors(newErrors);
    setWarnings(newWarnings);
  };

  const handleEdit = (rowIndex, field, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][field] = value;
    setRows(updatedRows);
    validateRows(updatedRows);
  };

  const uploadImage = async (file) => {
    const imgRef = storageRef(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(imgRef, file);
    return await getDownloadURL(imgRef);
  };

  const handleImageUpload = async (rowIndex, field, file) => {
    if (!file) return;
    const updatedUploading = { ...uploading, [`${rowIndex}-${field}`]: true };
    setUploading(updatedUploading);

    try {
      const url = await uploadImage(file);
      const updatedRows = [...rows];
      updatedRows[rowIndex][field] = url;
      updatedRows[rowIndex][`_${field}File`] = file;
      setRows(updatedRows);
      validateRows(updatedRows);
    } catch (err) {
      console.error("Image upload failed", err);
    }

    setUploading((prev) => ({ ...prev, [`${rowIndex}-${field}`]: false }));
  };
  // ✅ default schema for every product
//   const defaultProductSchema = {
//     CategoryName: "",
//     FlavourCode: 0,
//     PriceListID: "",
//     PriceListName: "",
//     SubCategoryCode: 0,
//     active: true,
//     beforeDiscPrice: 0,
//     cessPerc: 0,
//     cgstperc: 0,
//     companyID: "MLC", // fixed
//     contains: "",
//     discAmt: 0,
//     discPerc: 0,
//     free: 0,
//     gst: 0,
//     hsnCode: "",
//     id: "", // will be set = productId
//     importStatus: false,
//     isMarginBased: false,
//     margin: 0,
//     per: 1,
//     productCode: 0, // same as productId
//     productGroupCode: 0, // from category
//     productGroupId: "",  // from category
//     productId: "",
//     productImageURL: "",
//     productImageURL2: "",
//     productName: "",
//     qty: 0,
//     rate: 0,
//     retailproduct: true,
//     salesPrice: 0,
//     sgstperc: 0,
//     sortingorder: 1,
//     stock: 0,
//     stockValue: 0,
//     uom: 0,      // numeric id from generalMaster
//     uomid: "",   // id key
//     youtubeURL: "",
//     tag: ""
//   };
   const saveToDatabase = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < rows.length; i++) {
        const excelRow = { ...rows[i] };

        // --- lookup category ---
        const category = Object.values(Categories).find(
          (cat) => cat.generalName === excelRow["Category Name"]
        );

        // --- lookup uom ---
        const [uomId, uomVal] =
          Object.entries(generalMaster?.UOM || {}).find(
            ([, val]) => val.generalName === excelRow["Unit-[uom]"]
          ) || [];

        // --- prepare product object with defaults ---
        const product = {
         
          ...{
            CategoryName: excelRow["Category Name"] || "",
            productId: excelRow["Product Id"]?.toString(),
            productCode: excelRow["Product Id"]?.toString(),
            id: excelRow["Product Id"]?.toString(),
            productName: excelRow["Product Name"] || "",
            beforeDiscPrice: Number(excelRow["Before Discount Price"] || 0),
            discPerc: Number(excelRow["Discount %"] || 0),
            salesPrice: Number(excelRow["Sales Price"] || 0),
            per: Number(excelRow["Per Unit"] || 1),
            sortingorder: Number(excelRow["Sorting Order"] || 1),
            active: excelRow["Active"]?.toLowerCase() === "yes",
            contains: excelRow["Contains"] || "",
            tag: excelRow["Tag Name"] || "",
            productImageURL: excelRow.image1 || "",
            productImageURL2: excelRow.image2 || "",
            CategoryId: category?.id || "",
            productGroupId: category?.id || "",
            productGroupCode: category?.generalCode || 0,
            uom: uomId ? Number(uomId) : 0,
            uomid: uomId || "",
          },
        };

        // --- merge if product already exists ---
        const newRef = ref(database, `MLC/Products/${product.productId}`);
        const snap = await get(newRef);

        if (snap.exists()) {
          // merge existing with new values
          const existing = snap.val();
          await set(newRef, { ...existing, ...product });
        } else {
          // insert new
          await set(newRef, product);
        }
      }
      alert("Products imported successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving products");
    }
    setLoading(false);
  };


  const displayFields = [
    "S.No",
    "Product Id",
    "Product Name",
    "Category Name",
    "Before Discount Price",
    "Discount %",
    "Sales Price",
    "Per Unit",
    "Unit-uomid",
    "Unit-[uom]",
    "Tag Name",
    "Contains",
    "Sorting Order",
    "Active",
    "image1",
    "image2",
  ];

  return (
    <div className="p-4">
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />

      {rows.length > 0 &&
        Object.keys(errors).length === 0 &&
        (
          <Button onClick={saveToDatabase} disabled={loading} className="mt-4">
            {loading ? "Saving..." : "Save to Database"}
          </Button>
        )}

      {rows.length > 0 && (
        <table className="border border-gray-300 mt-4 w-full text-sm">
          <thead>
            <tr>
              {displayFields.map((key) => (
                <th key={key} className="border p-2 bg-gray-100">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {displayFields.map((field) => (
                  <td
                    key={field}
                    className={`border p-2 align-top ${
                      errors[rowIndex]?.[field]
                        ? "bg-red-100"
                        : warnings[rowIndex]?.[field]
                        ? "bg-yellow-100"
                        : ""
                    }`}
                  >
                    {field === "S.No" ? (
                      rowIndex + 1
                    ) : field === "image1" || field === "image2" ? (
                      <div className="flex flex-col items-center gap-2">
                        {uploading[`${rowIndex}-${field}`] ? (
                          <span className="text-blue-500 text-xs">
                            Uploading...
                          </span>
                        ) : row[field] ? (
                          <img
                            src={row[field]}
                            alt="preview"
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : null}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(
                              rowIndex,
                              field,
                              e.target.files[0]
                            )
                          }
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={row[field] || ""}
                        onChange={(e) =>
                          handleEdit(rowIndex, field, e.target.value)
                        }
                        className="w-full p-1 border"
                      />
                    )}

                    {errors[rowIndex]?.[field] && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors[rowIndex][field]}
                      </div>
                    )}

                    {warnings[rowIndex]?.[field] && (
                      <div className="text-yellow-600 text-xs mt-1">
                        {warnings[rowIndex][field]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};