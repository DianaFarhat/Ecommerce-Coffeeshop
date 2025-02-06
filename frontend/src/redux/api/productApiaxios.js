import axios from "axios";
import api from "../api/api";  // Correct the import if needed

// Export the functions
export const getProducts = async (keyword) => {
  try {
    const response = await api.get('/', { params: { keyword } });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Handle error
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;  // Handle error
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get('/allProducts');
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const createReview = async (productId, reviewData) => {
  try {
    const response = await api.post(`/${productId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const getTopProducts = async () => {
  try {
    const response = await api.get('/top');
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};

export const getNewProducts = async () => {
  try {
    const response = await api.get('/new');
    return response.data;
  } catch (error) {
    console.error('Error fetching new products:', error);
    throw error;
  }
};

export const getFilteredProducts = async (checked, radio) => {
  try {
    const response = await api.post('/filtered-products', { checked, radio });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    throw error;
  }
};
