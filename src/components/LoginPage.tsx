// components/Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type Role = 'admin' | 'teacher' | 'student';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student'); // Default role to student
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { username, password, role });
      if (response.data.success) {
        setMessage('Login successful!');
        router.replace(`/${role}`); // Navigate to the appropriate dashboard based on role
      } else {
        setMessage('Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col max-w-md p-6 mx-auto mt-10 bg-gray-800 rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center text-primary">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className="p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
      >
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>

      <button type="submit" className="p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </form>
  );
};

export default Login;
