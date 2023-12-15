import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';

const CategoryForm = () => {
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
    <div>
      <h2 style={{marginBottom:'50px'}}> Category Management </h2>
      <Row className="mt-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label htmlFor="newCategory">New Category:</Form.Label>
            <Form.Control type="text" id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label htmlFor="addCategory">Add Category:</Form.Label>
            <div className="input-group" style={{ marginBottom: '20px' }}>
              <Button variant="primary" className="rounded" style={{ width: '150px' }} onClick={handleAddCategory}>
                Add
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleUpdateCategory(category)}>
                      Update
                    </Button>
                    <Button variant="danger" className="mx-2" onClick={() => handleDeleteCategory(category)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryForm;