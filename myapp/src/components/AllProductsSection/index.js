import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {TailSpin} from "react-loader-spinner";
import ProductCard from '../ProductCard'
import FiltersGroup from '../FiltersGroup/index'
import ProductsHeader from '../ProductsHeader';

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const AllProductsSection = () => {

  const [productsList,setProductsList] = useState([]);
  const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial);
  const [activeOptionId,setActiveOptionId] = useState(sortbyOptions[0].optionId);
  const [activeCategoryId,setActiveCategoryId] = useState("");
  const [searchInput,setSearchInput] = useState('');
  const [activeRatingId,setAtiveRatingId] = useState('');

  const getAllProducts = async () => {
    try {

      setApiStatus(apiStatusConstants.inProgress);

      const jwtToken = Cookies.get('jwt_token');

      const options = {
        method : "GET",
        headers : {
          Authorization : `Bearer ${jwtToken}`
        }
      }

      const url = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`

      const response = await fetch(url,options);

      const data = await response.json();

      console.log("Data : ",data);

      if(response.ok){
        const updatedData = data.products.map((each) => ({
          title: each.title,
          brand: each.brand,
          price: each.price,
          id: each.id,
          imageUrl: each.image_url,
          rating: each.rating,
        }))

        setProductsList(updatedData);
        setApiStatus(apiStatusConstants.success)

      } else {
        setApiStatus(apiStatusConstants.failure);
      }
      
    } catch (error) {
      console.log("Error While Fetching All Products in AllProductsSection Component : ",error)
    }
  }

  useEffect(() => {
    getAllProducts();
  },[activeCategoryId,activeRatingId,activeOptionId])

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <TailSpin color="#0b69ff" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  const changeSortby = activeOptionId => {
    setActiveOptionId(activeOptionId);
  }

  const  renderProductsListView = () => {
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }


  const renderAllProducts = () => {
    switch(apiStatus){
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.failure :
        return renderFailureView()
      case apiStatusConstants.success:
        return renderProductsListView()
      default : 
      return null
    }
  }

  const changeSearchInput = searchInput => setSearchInput(searchInput);

  const enterSearchInput = () => getAllProducts();

  const changeCategory = (activeCategoryId) => setActiveCategoryId(activeCategoryId)

  const changeRating = (activeRatingId) => setAtiveRatingId(activeRatingId)

  const clearFilters = () => {
    setSearchInput("");
    setActiveCategoryId("");
    setAtiveRatingId("");
    getAllProducts();
  }

  return (
    <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={changeSearchInput}
          enterSearchInput={enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={changeCategory}
          changeRating={changeRating}
          clearFilters={clearFilters}
        />
      {renderAllProducts()}
    </div>
  )
}

export default AllProductsSection