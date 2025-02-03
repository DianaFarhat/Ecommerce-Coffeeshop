import React from 'react'
import Message from '../../components/Message'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from 'react-icons/fa'

const ProductCarousel = () => {
  return (
    <div>
      Product Carousel
    </div>
  )
}

export default ProductCarousel

