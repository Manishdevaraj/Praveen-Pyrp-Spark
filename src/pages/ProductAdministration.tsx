// @ts-nocheck
import React from 'react'
import Shop from './Shop'
import { AddProductToShop, EditProduct } from '@/components/AdminProduct'
// import { ExportProductDataToExcel, ImportProductDataFromExcel } from '@/components/ExcelAdmin'

const ProductAdministration = () => {
  return (
    <>
     <div className="flex gap-3 items-center justify-center">

           <AddProductToShop/>
           <EditProduct/>
           {/* <ExportProductDataToExcel/>
           <ImportProductDataFromExcel/> */}
          </div>
    <Shop isStandardCrackers={true}/>
    </>
  )
}

export default ProductAdministration