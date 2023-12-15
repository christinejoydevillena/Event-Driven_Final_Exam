import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import StocksLineGraph from './StocksLineGraph';


const StockList = () => {
  const [categories] = useState(() => {
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

  const [maxUsedId] = useState(() => {
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
  

  


  return (
    <div className="row">
      <div className="col-md-6" style={{ paddingRight: '50px' }}>
        <h2 style={{ marginBottom: '50px' }}>Stock Management</h2>
        <h4 style={{ marginBottom: '20px' }}>Stocks</h4>
        <Table striped bordered hover style={{ marginBottom: '100px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stock</th>
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
                    <Form.Control type="number" value={editedValues.stock} onChange={(e) => setEditedValues({ ...editedValues, stock: e.target.value })} />
                  ) : (
                    product.stock
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
      <div className="col-md-6" style={{ paddingLeft: '10px' }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <StocksLineGraph stockData={products} />
        </div>
      </div>
    </div>
  );
};

export default StockList;