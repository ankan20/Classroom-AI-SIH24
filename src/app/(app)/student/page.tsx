'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const StudentDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTeachers = async () => {
      const username = JSON.parse(localStorage.getItem('user') || '{}').username;

      const res = await fetch('/api/get-teacher-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        console.error('Failed to fetch teachers');
        return;
      }

      const data = await res.json();
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  const handleInsightClick = (teacherName: string) => {
    router.push(`/student/${teacherName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl mt-40 font-bold text-gray-900 mb-6">Student Dashboard</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher: any) => (
              <tr key={teacher.teacherId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.teacherName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleInsightClick(teacher.teacherName)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    See Insight
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
