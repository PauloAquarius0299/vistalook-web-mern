import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: [],
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({filtersParams, sortParams}) => {
      console.log(fetchAllFilteredProducts, 'fetchAllFilteredProducts');

      const query = new URLSearchParams({
        ...filtersParams,
        sortBy: sortParams
      })

      const result = await axios.get(
         `http://localhost:5000/api/shop/products/get?${query}`
      );

      console.log(result);
  
      return result?.data;
    }
  );

  export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`
      );
  
      return result?.data;
    }
  );

  const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
      setProductDetails: (state) => {
        state.productDetails = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllFilteredProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllFilteredProducts.rejected, (state) => {
          state.isLoading = false;
          state.productList = [];
        })
        .addCase(fetchProductDetails.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productDetails = action.payload.data;
        })
        .addCase(fetchProductDetails.rejected, (state) => {
          state.isLoading = false;
          state.productDetails = null;
        });
    },
});
  

export const {setProductDetails} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer