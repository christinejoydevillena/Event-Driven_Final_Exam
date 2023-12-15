import ProductList from './ProductManagement2';

const ProductList = () => {
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
    <div class="col-md-12">
      <ProductForm onAddProduct={handleAddProduct} categories={categories} updateCategories={setCategories} />
      <table class="table table-hover" style={{marginBottom:'100px'}}>
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
                  <input type="text" value={editedValues.name} onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })} />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input type="number" value={editedValues.price} onChange={(e) => setEditedValues({ ...editedValues, price: e.target.value })} />
                ) : (
                  `₱${product.price}`
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input type="number" value={editedValues.stock} onChange={(e) => setEditedValues({ ...editedValues, stock: e.target.value })} />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <select
                    value={editedValues.category}
                    onChange={(e) => setEditedValues({ ...editedValues, category: e.target.value })}
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <>
                    <button onClick={() => handleSaveEdit(product.id, editedValues)}>Save</button>
                    <button onClick={handleDoneEditing}>Done</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{marginBottom:'50px'}}> Category Management </h2>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="newCategory">New Category:</label>
            <input type="text" className="form-control" id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="addCategory">Add Category:</label>
            <div className="input-group">
              <button type="button" className="btn btn-primary rounded" style={{width: '150px'}} onClick={handleAddCategory}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="row mt-3">
        <div className="col-md-12">
          <table className="table table-hover">
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
                    <button type="button" className="btn btn-warning" onClick={() => handleUpdateCategory(category)}>
                      Update
                    </button>
                    <button type="button" className="btn btn-danger ml-2" onClick={() => handleDeleteCategory(category)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;