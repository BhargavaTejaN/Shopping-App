import React, { useState, useEffect,useContext } from "react";
import NavBar from "../NavBar";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import SimilarProductItem from '../SimilarProductItem/index'

import {CartContext} from '../../context/index'

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductItemDetails = () => {

  const {addCartItem} = useContext(CartContext);

  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity,setQuantity] = useState(1);

  const { id } = useParams();

  const getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });

  const getProduct = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress);

      const jwtToken = Cookies.get("jwt_token");

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const url = `https://apis.ccbp.in/products/${id}`;

      const response = await fetch(url, options);

      const data = await response.json();

      if (response.ok) {
        setApiStatus(apiStatusConstants.success);
        const updatedData = getFormattedData(data);

        //console.log("UPDATED DATA : ",updatedData)

        const updatedSimilarProductsData = data.similar_products.map((each) =>
          getFormattedData(each)
        );

        //console.log("UPDATED PRODUCT DATA : ",updatedSimilarProductsData)

        setProductData(updatedData);
        setSimilarProductsData(updatedSimilarProductsData);

        // console.log("UPDATED DATA : ",productData);
        // console.log("SIMILAR PRODUCTS DATA : ",similarProductsData);
      }

      if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.log("Error While Fetching Data in ProductItemDetails : ", error);
    }
  };

  useEffect(() => {
    getProduct();
  },[]);

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <TailSpin color="#0b69ff" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData;


    const onClickAddToCart = () => {
      addCartItem({...productData,quantity})
    };

    const onIncrementQuantity = () => setQuantity((prevstate) => prevstate+1);
      
    const onDecrementQuantity = () => {
      if(quantity >1){
        setQuantity((prevstate) => prevstate-1);
      }
    }

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
                data-testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
                data-testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map((eachSimilarProduct) => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    );
  };

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
