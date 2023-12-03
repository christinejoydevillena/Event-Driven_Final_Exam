import React, { useState } from 'react';

const CategoryManagement = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingIndex] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');

  const addCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  const deleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const editCategory = (index) => {
    setEditingIndex(index);
    setUpdatedCategoryName(categories[index]);
  };

  const updateCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = updatedCategoryName;
    setCategories(updatedCategories);
    setEditingIndex(null);
  };

  return (
    <div>
      <h2>Category Management</h2>
      <input
        type="text"
        name="CategoryName"
        placeholder="Category Name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        required
      />
      <button onClick={addCategory}>Add Category</button>

      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {editingCategory === index ? (
              <>
                <input
                  type="text"
                  value={updatedCategoryName}
                  onChange={(e) => setUpdatedCategoryName(e.target.value)}
                />
                <button onClick={() => updateCategory(index)}>Update</button>
              </>
            ) : (
              <>
                {category}
                <button onClick={() => deleteCategory(index)}>Delete</button>
                <button onClick={() => editCategory(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
