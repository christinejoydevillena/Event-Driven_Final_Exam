import React, { useState } from 'react';

const ProductManagement = ({ categories, onSubmit }) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const generateProductId = () => {
    return parseInt(product.id + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = generateProductId();
    onSubmit({ ...product, id: productId });
    setProduct({
      id: productId,
      name: '',
      price: '',
      stock: '',
      category: '',
    });
  };
  

  return (
    <div>
      <h2>Product Management</h2>
   <form onSubmit={(e) => handleSubmit(e)}>
      <label>Product ID</label>
      <input 
      type="text" 
      name="id" 
      value={product.id} 
      onChange={handleChange} 
      readOnly
      required
      />

      <label>Product Name</label>
      <input 
      type="text" 
      name="name" 
      value={product.name || ''} 
      onChange={handleChange} 
      required
      />

      <label>Product Price</label>
      <input 
      type="text" 
      name="price" 
      value={product.price || ''} 
      onChange={handleChange} 
      required
      />

      <label>Product Stock</label>
      <input 
      type="number" 
      name="stock" 
      value={product.stock || ''} 
      onChange={handleChange} 
      required
      />
       
       <label>Product Category</label>
       <select
          name="category"
          value={product.category || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

      

      <button type="submit">Add Product</button>
       </form>
      
    </div>
  );
};

export default ProductManagement;
