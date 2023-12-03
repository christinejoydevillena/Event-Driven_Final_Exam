import React from 'react';

const ProductList = ({ products, onDelete }) => {
  return (
    <div>
      <h2>Product List</h2>
      <table>
      <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                {products.map((product) => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name} </td> 
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                   <td> <button onClick={() => onDelete(product.id)}>Delete</button></td>
                   </tr>
                ))}
         </tbody>
      </table>
    </div>
  );
};

export default ProductList;
