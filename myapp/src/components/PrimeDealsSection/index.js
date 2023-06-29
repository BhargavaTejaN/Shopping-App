import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {TailSpin} from "react-loader-spinner";

import './index.css'
import ProductCard from '../ProductCard';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const PrimeDealsSection = () => {

  const [primeDeals,setPrimeDeals] = useState([]);
  const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial);

  const getPrimeDeals = async() => {

    try {

      setApiStatus(apiStatusConstants.inProgress);
      const jwtToken = Cookies.get('jwt_token');

      const options = {
        method : "GET",
        headers : {
          Authorization: `Bearer ${jwtToken}`,
        }
      }

      const url = 'https://apis.ccbp.in/prime-deals';

      const response = await fetch(url,options);

      const data = await response.json();

      if(response.ok){
        const updatedData = data.prime_deals.map((each) => ({
          title: each.title,
          brand: each.brand,
          price: each.price,
          id: each.id,
          imageUrl: each.image_url,
          rating: each.rating,
        }))
        setApiStatus(apiStatusConstants.success);
        setPrimeDeals(updatedData);
      }

      if(response.status === 401){
        setApiStatus(apiStatusConstants.failure);
      }
      
    } catch (error) {
      console.log("Error In PrimeDeals Section : ",error)
    }

  }

  useEffect(() => {
    getPrimeDeals();
},[])

const renderLoadingView = () => (
  <div className="products-loader-container">
    <TailSpin color="#0b69ff" height={50} width={50} />
  </div>
)

const renderPrimeDealsFailureView = () => (
  <img
    src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
    alt="register prime"
    className="register-prime-img"
  />
)

const renderPrimeDealsListView = () => {
  return (
    <div>
      <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
      <ul className="products-list">
        {primeDeals.map(product => (
          <ProductCard productData={product} key={product.id} />
        ))}
      </ul>
    </div>
  )
}

const renderAllProducts = () => {
  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderPrimeDealsListView()
    case apiStatusConstants.failure:
      return renderPrimeDealsFailureView()
    case apiStatusConstants.inProgress:
      return renderLoadingView()
    default:
      return null
  }
}

  return (
    <div>
      {renderAllProducts()}
    </div>
  )
}

export default PrimeDealsSection