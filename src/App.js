import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductManagement from './components/ProductManagement2';
import StockManagement from './components/StockManagement';
import TransactionManagement from './components/TransactionManagement';
import TransactionReport from './components/TransactionReport';
import CategoryManagement from './components/CategoryManagement';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/products" element={<ProductManagement/>} />
            <Route path="/stocks" element={<StockManagement/>} />
            <Route path="/transactions" element={<TransactionManagement/>} />
            <Route path="/categories" element={<CategoryManagement/>} />
            <Route path="/reports" element={<TransactionReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
