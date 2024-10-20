import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers,createUser } from './redux/userSlice';


function App() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);

  // Local state for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle form submission to create a new user
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    dispatch(createUser(newUser)); // Dispatch the createUser action
    
    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="App">
      <h1>User List</h1>

      {/* Display Loading, Error or User List */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      )}

      {/* Form to create a new user */}
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default App;
