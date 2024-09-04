"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function AddTeacherPage() {
  const [teacherUsername, setTeacherUsername] = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve admin ID from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'admin') {
        setAdminId(user.id);
      } else {
        // Handle case where user is not an admin
        router.push('/login');
      }
    } else {
      // Redirect to login if no user data is found
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!adminId) {
      setError('Admin ID is not available');
      return;
    }

    try {
      const response = await fetch('/api/admin/add-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacherUsername, adminId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add teacher');
      }

      setSuccessMessage(`Teacher ${teacherUsername} added successfully!`);
      setTeacherUsername(""); // Clear input field
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40">
      <h2 className="text-2xl font-bold mb-4">Add Existing Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="teacherUsername" className="block text-sm font-medium">Teacher Username</label>
          <input
            id="teacherUsername"
            type="text"
            value={teacherUsername}
            onChange={(e) => setTeacherUsername(e.target.value)}
            required
            className="w-full min-h-8 border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200">Add Teacher</button>
      </form>
    </div>
  );
}

export default AddTeacherPage;
