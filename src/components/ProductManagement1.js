import React, { useState } from 'react';

const ProductForm = ({ onAddProduct, categories}) => {
  const [formData, setFormData] = useState({ name: '', price: 0, stock: 0, category: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(formData);
    setFormData({ name: '', price: 0, stock: 0, category: '' });
  };
  

  /* INPUT FIELDS */
  return (
    <form onSubmit={handleSubmit}>
    <div className="container" style={{marginBottom:'50px'}}>
    <h2 style={{marginBottom:'50px'}}> Product Management </h2>
    <div className="row">
      <div className="col-md-3">
        <div className="form-group">
          <label for="name">Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required/>
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-group">
          <label for="price">Price:</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required/>
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-group">
          <label for="stock">Stock:</label>
          <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required/>
        </div>
      </div>
      <div className="col-md-3">
        <div className="form-group">
          <label for="category">Category:</label>
          <select className="form-control custom-select" name="category" value={formData.category} onChange={handleChange} required>
          <option value="" disabled>Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
          </select>
        </div>
      </div>
      <div className="col-md-2">
        <div className="form-group">
          <label htmlFor="add_product">Add:</label>
          <div className="input-group">
            <button type="submit" className="btn btn-primary rounded" style={{width:'200px'}}> Add </button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </form>
  );
};


export default ProductForm;