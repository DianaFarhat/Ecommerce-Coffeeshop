import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/Loader.js';
import Message from '../../components/Message.js';

import Product from '../Products/Product.jsx';
import { useGetProductsQuery } from '../../redux/api/productApiSlice.js'; // Correct the import

import Header from '../../components/Header.js';

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error || "An error occurred"}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">Special Products</h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

//TODO: HuXn's version
/*
const Home= () =>{
  return <div>Home</div>
};
*/

export default Home;
