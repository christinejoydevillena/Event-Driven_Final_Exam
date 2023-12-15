import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import ProductForm from './ProductManagement1';

const ProductList = () => {
  const [categories, setCategories] = useState(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [
      "Apparel and Fashion",
      "Electronics and Technology",
      "Beauty and Cosmetics",
    ];
    return storedCategories;
  });

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const [products, setProducts] = useState(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    return storedProducts;
  });

  const [maxUsedId, setMaxUsedId] = useState(() => {
    const storedMaxUsedId = JSON.parse(localStorage.getItem('maxUsedId')) || 0;
    return storedMaxUsedId;
  });

  const [editProductId, setEditProductId] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('maxUsedId', JSON.stringify(maxUsedId));
  }, [maxUsedId]);

  const handleAddProduct = (newProduct) => {
    const newId = maxUsedId + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setMaxUsedId(newId);
  };


  /* FOR PRODUCT TABLE */
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    setEditProductId(null);
  };

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
    setEditedValues({ ...products.find((product) => product.id === productId) });
  };

  const handleSaveEdit = (productId, updatedValues) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, ...updatedValues } : product
    );
    setProducts(updatedProducts);
    setEditProductId(null);
    setEditedValues({});
  };

  const handleDoneEditing = () => {
    setEditProductId(null);
    setEditedValues({});
  };
  


  /* FOR CATEGORY TABLE */
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      console.log('New Categories:', updatedCategories);
      setNewCategory('');
    }
  };

  const handleUpdateCategory = (category) => {
    const updatedCategory = prompt(`Update category "${category}" to:`);
    if (updatedCategory !== null && updatedCategory.trim() !== '') {
      const updatedCategories = categories.map((c) => (c === category ? updatedCategory.trim() : c));
      setCategories(updatedCategories);
    }
  };

  const handleDeleteCategory = (category) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the category "${category}"?`);
    if (confirmDelete) {
      const updatedCategories = categories.filter((c) => c !== category);
      setCategories(updatedCategories);
    }
  };
  



  return (
    <div className="col-md-12">
      <ProductForm onAddProduct={handleAddProduct} categories={categories} updateCategories={setCategories} />
      <Table striped bordered hover style={{ marginBottom: '100px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editProductId === product.id ? (
                  <Form.Control type="text" value={editedValues.name} onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })} />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <Form.Control type="number" value={editedValues.price} onChange={(e) => setEditedValues({ ...editedValues, price: e.target.value })} />
                ) : (
                  `₱${product.price}`
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <Form.Control type="number" value={editedValues.stock} onChange={(e) => setEditedValues({ ...editedValues, stock: e.target.value })} />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <Form.Select value={editedValues.category} onChange={(e) => setEditedValues({ ...editedValues, category: e.target.value })}>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <>
                    <Button variant="warning" onClick={() => handleSaveEdit(product.id, editedValues)}>Save</Button>
                    <Button variant="danger" className="mx-2" onClick={handleDoneEditing}>Done</Button>
                  </>
                ) : (
                  <>
                    <Button variant="warning" onClick={() => handleEditProduct(product.id)}>Edit</Button>
                    <Button variant="danger" className="mx-2" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;