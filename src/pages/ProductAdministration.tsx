// @ts-nocheck
import React from 'react'
import Shop from './Shop'
import { AddProductToShop, EditProduct, EditSettings } from '@/components/AdminProduct'

const ProductAdministration = () => {
  
  return (
    <>
     <div className="flex gap-3 items-center justify-center">

           <AddProductToShop/>
           <EditProduct/>
           <EditSettings/>
          </div>
    <Shop isStandardCrackers={true}/>
    </>
  )
}

export default ProductAdministration