import React, { useState, useEffect } from 'react';
import '../style/db.css';

function DashBoard ()  {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingUser = users.find((user) => user.id === formData.id);
    if (existingUser) {
      // EDIT EXISTING USERS
      const editedUsers = users.map((user) =>
        user.id === formData.id ? formData : user
      );
      setUsers(editedUsers);
      localStorage.setItem('users', JSON.stringify(editedUsers));
    } else {
      // CREATE NEW USERS
      const newUsers = [...users, formData];
      setUsers(newUsers);
      localStorage.setItem('users', JSON.stringify(newUsers));
    }
    setFormData({ id: '', name: '', email: '' });
  };

  const handleDelete = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const handleEdit = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    setFormData(selectedUser);
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">{formData.id ? 'Edit' : 'Create'}</button>
      </form>
      <hr />
      <h2>ALL USERS</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoard;