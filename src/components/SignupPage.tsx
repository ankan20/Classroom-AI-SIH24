// components/Signup.tsx
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation";

type Role = 'admin' | 'teacher' | 'student';

interface Images {
  front: File | null;
  left: File | null;
  right: File | null;
  up: File | null;
}

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student'); // Default role to student
  const [images, setImages] = useState<Images>({ front: null, left: null, right: null, up: null });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // To handle success message color
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, position: keyof Images) => {
    if (e.target.files && e.target.files[0]) {
      setImages((prevImages) => ({ ...prevImages, [position]: e.target.files[0] }));
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all images are uploaded if the role is 'student'
    if (role === 'student' && (Object.values(images).some((image) => image === null))) {
      setMessage('Please upload all required images.');
      setIsSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);

    // Append images to FormData only if they are provided
    Object.entries(images).forEach(([key, file]) => {
      if (file) {
        formData.append(`images.${key}`, file);
      }
    });

    try {
      const response = await axios.post('/api/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        setMessage('Signup successful!');
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/login'); // Use router.push instead
        }, 1000); // Delay for a smoother user experience
      } else {
        throw new Error('Signup failed.');
      }

    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Signup failed.');
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col max-w-md p-6 mx-auto mt-10 bg-gray-800 rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center text-primary">Signup on ClassroomAI</h2>
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

      {role === 'student' && (
        <div className="mb-4">
          <div className="mb-2">
            <label>Front-facing Image:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'front')}
              accept="image/*"
              required
              className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mb-2">
            <label>Left Side-facing Image:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'left')}
              accept="image/*"
              required
              className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mb-2">
            <label>Right Side-facing Image:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'right')}
              accept="image/*"
              required
              className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="mb-2">
            <label>Up-facing Image:</label>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, 'up')}
              accept="image/*"
              required
              className="block w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
        </div>
      )}

      <button type="submit" className="p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600">Signup</button>
      {message && (
        <p className={`mt-4 text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
      <p className="text-sm font-normal text-white mt-4">Login if already a user ,
        <Link href={"/login"} className="text-blue-400 hover:underline ml-2">login</Link>
      </p>
    </form>
  );
};

export default Signup;
