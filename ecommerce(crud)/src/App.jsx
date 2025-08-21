import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "./features/productSlice";

function App() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  const [form, setForm] = useState({ title: "", price: "", img: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProduct({ ...form, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addProduct(form));
    }
    setForm({ title: "", price: "", img: "", description: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>🛒 E-Commerce CRUD</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input type="text" placeholder="Image URL" value={form.img} onChange={e => setForm({...form, img: e.target.value})} required />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      {loading ? <p>Loading...</p> :
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
          {products.map(p => (
            <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 15, textAlign: "center" }}>
              <img src={p.img} alt={p.title} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }} />
              <h3>{p.title}</h3>
              <p style={{ fontWeight: "bold", color: "green" }}>₹{p.price}</p>
              <p style={{ fontSize: 14, color: "#555" }}>{p.description}</p>
              <button onClick={() => handleEdit(p)} style={{ marginRight: 5 }}>Edit</button>
              <button onClick={() => dispatch(deleteProduct(p.id))}>Delete</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
