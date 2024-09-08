// frontend/app/student/[teacherName]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const StudentPage = () => {
  const [behaviorData, setBehaviorData] = useState<any[]>([]); // Default to empty array
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { teacherName } = useParams(); // Get the teacher name from URL

  useEffect(() => {
    const fetchStudentData = async () => {
      const username = JSON.parse(localStorage.getItem('user') || '{}').username;

      try {
        const res = await fetch('/api/get-weekly-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentUsername: username, teacherUsername: teacherName }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        console.log(data)
        // Ensure behaviorData is an array
        setBehaviorData(Array.isArray(data.behaviorData) ? data.behaviorData : [data.behaviorData]);
        setAttendancePercentage(data.attendancePercentage);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [teacherName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-40">Behavior and Attendance for {teacherName}</h1>

      <div className="bg-white shadow-lg rounded-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 p-4 border-b">Behavior Data</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Date', 'Hand Raising', 'Reading', 'Turn Around', 'Looking Forward', 'Writing', 'Using Phone', 'Sleeping'].map((heading) => (
                <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {behaviorData.map((data: any, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(data.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.hand_raising}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.reading}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.turn_around}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.looking_forward}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.writing}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.using_phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.sleeping}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 p-4 border-b">Attendance Percentage</h2>
        <p className="p-4 text-lg text-gray-800">{attendancePercentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default StudentPage;
