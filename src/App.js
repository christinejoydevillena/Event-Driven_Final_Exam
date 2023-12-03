import React, { useState } from 'react';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';
import ProductList from './ProductList';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const handleProductSubmit = (product) => {
    setProducts([...products, product]);
  };

  const handleProductDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div>
      <CategoryManagement categories={categories} setCategories={setCategories} />
      <ProductManagement categories={categories} onSubmit={handleProductSubmit} />
      <ProductList products={products} onDelete={handleProductDelete} />
    </div>
  );
};

export default App;