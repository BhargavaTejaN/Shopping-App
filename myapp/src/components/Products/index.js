import React from 'react'

import './index.css'
import NavBar from '../NavBar'
import AllProductsSection from '../AllProductsSection/index'
import PrimeDealsSection from '../PrimeDealsSection'

const Products = () => {
  return (
    <>
      <NavBar />
      <div className="product-sections">
        <PrimeDealsSection />
        <AllProductsSection />
      </div>
    </>
  )
}

export default Products