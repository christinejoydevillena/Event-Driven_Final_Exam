import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const Cart = ({ cartItems, removeFromCart, editQuantity, handlePlaceOrder}) => {
  const computeTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const computeTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  return (
    <div>
      <h4>SHOPPING CART</h4>
      <Table striped bordered hover style={{marginBottom:'20px'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>₱{item.price}</td>
              <td>
                <div className="input-group">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => editQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="input-group-text">{item.quantity}</span>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => editQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="border border-2 p-3" style={{ maxWidth: '600px' }}>
        <p className="h5 text-center">Summary</p>
        <hr className="my-3" style={{ width: '570px' }} />

        <div className="mb-3 mx-5">
          <p className="h6">Product List:</p>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {`${item.name} - ₱${item.price} (Quantity: ${item.quantity})`}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3 mx-5">
          <p className="h6">Total Items: {cartItems.length}</p>
        </div>

        <div className="mb-3 mx-5">
          <p className="h6">Total Quantity: {computeTotalQuantity()}</p>
        </div>

        <div>
          <p className="h6 mx-5">
            <strong>Total Price:</strong> ₱{computeTotalPrice()}
          </p>
        </div>
        
        <div className="mb-3 mx-5">
          <table className="table table-hover" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>
                  <button onClick={handlePlaceOrder} className="btn btn-warning" style={{ width: '100%' }}>
                    Place Order
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};






const TransactionManagement = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
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

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('maxUsedId', JSON.stringify(maxUsedId));
  }, [maxUsedId]);

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct && selectedProduct.stock > 0) {
      const existingCartItem = cartItems.find((item) => item.id === productId);
      if (existingCartItem) {
        const updatedCart = cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
      } else {
        setCartItems([...cartItems, { ...selectedProduct, quantity: 1 }]);
      }
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, stock: product.stock - 1 } : product
      );
      setProducts(updatedProducts);
    } else {
      console.log("Product out of stock or not found.");
    }
    
  };

  const removeFromCart = (productId) => {
    const removedCartItem = cartItems.find((item) => item.id === productId);
    if (removedCartItem) {
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, stock: product.stock + removedCartItem.quantity } : product
      );
      setProducts(updatedProducts);
    }
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  const editQuantity = (productId, newQuantity) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (newQuantity > 0 && newQuantity <= cartItem.stock) {
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, stock: product.stock + (cartItem.quantity - newQuantity) } : product
      );
      setProducts(updatedProducts);
    }
  };

  const generateReport = (orderedItems) => {
    const existingReportData = JSON.parse(localStorage.getItem('reportData')) || []; 
    const currentDateAndTime = new Date(); // get current date and time
    const newReportData = orderedItems.map((item, index) => ({
      id: existingReportData.length + index + 1, 
      productName: item.name,
      productPrice: item.price,
      productQuantity: item.quantity,
      productTotalAmount: item.price * item.quantity,
      dateTime: currentDateAndTime.toLocaleString() // store the date and time
    }));
  const updatedReportData = [...existingReportData, ...newReportData]; 
  localStorage.setItem('reportData', JSON.stringify(updatedReportData)); 
};


  const handlePlaceOrder = () => {
    const orderedItems = cartItems.slice(); 

    if (orderedItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    generateReport(orderedItems);

    const updatedReportData = JSON.parse(localStorage.getItem('reportData'));
    if (updatedReportData.length > 0) {
      setOrderPlaced(true);
      alert('Transaction successful!');
    } else {
      alert('Transaction unsuccessful.');
    }

    setCartItems([]);
  };
  
  const filteredProducts = products.filter((product) => product.stock > 0);
  const clearCart = () => {
    setCartItems([]); 
    const updatedProducts = products.map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock + cartItem.quantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };


  return (
    <div className="col-md-12">
      <h2 style={{ marginBottom: '50px' }}> Transaction Management </h2>
      <h4 style={{ marginBottom: '10px' }}> PRODUCTS </h4>
      <div className="d-flex flex-wrap gap-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-3 rounded" style={{ maxWidth: '200px', width: '100%' }}>
            <div className="text-truncate">
              <strong>Name:</strong> {product.name}
            </div>
            <div className="text-truncate">
              <strong>Price:</strong> ₱{product.price}
            </div>
            <div className="text-truncate">
              <strong>Stock:</strong> {product.stock}
            </div>
            <button onClick={() => handleAddToCart(product.id)} className="btn btn-primary mt-3">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <hr style={{ margin: '30px 0' }} />
      <div style={{ marginTop: '20px' }}>
      <button onClick={clearCart} className="btn btn-primary me-3">
       Clear Cart
      </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {cartItems.length > 0 && (
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            editQuantity={editQuantity}
            handlePlaceOrder={handlePlaceOrder}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionManagement;