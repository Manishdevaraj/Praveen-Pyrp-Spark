
import { ExportProductDataToExcel, ImportProductDataFromExcel } from '@/components/ExcelAdmin'

const ExcelAdmin = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <ExportProductDataToExcel/>
        <ImportProductDataFromExcel/>
    </div>
  )
}

export default ExcelAdmin