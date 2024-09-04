import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

const AddStudentForm: React.FC = () => {
  const [studentUsername, setStudentUsername] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  // Retrieve the teacher ID from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.id) {
          setTeacherId(user.id);
        } else {
          console.error('Teacher ID is missing in local storage');
        }
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    } else {
      console.error('No user found in local storage');
    }
  }, []);
  

  const handleCheckUsername = useCallback(
    debounce(async (username: string) => {
      try {
        const response = await fetch('/api/teacher/check-student', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
        const result = await response.json();
        setUsernameValid(result.valid);
      } catch (error) {
        console.error('Error checking student:', error);
      }
    }, 500),
    []
  );

  const handleAddStudent = async () => {
    if (!usernameValid) {
      setError('Student username is invalid or does not exist.');
      return;
    }

    try {
      const response = await fetch('/api/teacher/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacherId, studentUsername }),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const result = await response.json();
      setMessage(`Student ${studentUsername} added successfully.`);
      setStudentUsername(''); // Clear the input field
      setError(null); // Clear previous error message
    } catch (error: any) {
      setError(error.message);
      setMessage(null); // Clear previous success message
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add Student to Your Class</h1>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <input
          type="text"
          value={studentUsername}
          onChange={(e) => {
            const newUsername = e.target.value;
            setStudentUsername(newUsername);
            handleCheckUsername(newUsername);
          }}
          placeholder="Enter Student Username"
          className="border border-gray-300 dark:border-gray-700 p-2 rounded-md w-full mb-4 text-black"
        />
        {usernameValid === false && <p className="text-red-500">{studentUsername +" is not a valid student username"}</p>}
        {usernameValid === true && <p className="text-green-500">{studentUsername +" is a valid student username"}</p>}
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={usernameValid === null || usernameValid === false} // Disable button until validation is complete and valid
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default AddStudentForm;
