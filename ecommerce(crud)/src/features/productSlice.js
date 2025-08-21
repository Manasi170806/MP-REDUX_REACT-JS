import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/products";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch(API_URL);
  return res.json();
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  return res.json();
});

export const updateProduct = createAsyncThunk("products/update", async (product) => {
  const res = await fetch(`${API_URL}/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  return res.json();
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(addProduct.fulfilled, (state, action) => { state.products.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;
