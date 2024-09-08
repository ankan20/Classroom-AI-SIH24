
// "use client";
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter, useParams } from 'next/navigation';
// import dynamic from 'next/dynamic';

// // Dynamically import html2pdf only on the client-side
// const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });

// const AdminPage = () => {
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [attendanceData, setAttendanceData] = useState<Array<{ "Student Name": string; "Attendance Status": string }>>([]);
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const params = useParams();
//   const teacherUsername = params?.teachername;

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setVideoFile(file);
//       setVideoUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!videoFile) {
//       setMessage('Please select a video to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);

//     try {
//       const response = await axios.post('http://localhost:5001/api/upload-video', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.status === 200) {
//         setAttendanceData(response.data.attendance);
//         setMessage('Video uploaded successfully!');
//         await axios.post('/api/mark-attendance', {
//           teacherUsername,
//           attendanceData: response.data.attendance,
//         });

//       } else {
//         setMessage('Failed to process video.');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       setMessage('Failed to upload video.');
//     }
//   };

//   const downloadPDF = async () => {
//     if (attendanceData.length === 0) {
//       return;
//     }

//     const element = document.createElement('div');
//     element.classList.add('pdf-container');
//     element.innerHTML = `
//       <h2>Attendance Results</h2>
//       <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//         <thead>
//           <tr>
//             <th style="border: 1px solid #ddd; padding: 8px;">Student Name</th>
//             <th style="border: 1px solid #ddd; padding: 8px;">Attendance Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${attendanceData.map(item => `
//             <tr>
//               <td style="border: 1px solid #ddd; padding: 8px;">${item["Student Name"]}</td>
//               <td style="border: 1px solid #ddd; padding: 8px;">${item["Attendance Status"]}</td>
//             </tr>
//           `).join('')}
//         </tbody>
//       </table>
//     `;

//     // Ensure html2pdf is imported and available
//     if (html2pdf) {
//       html2pdf()
//         .from(element)
//         .save('attendance_result.pdf');
//     } else {
//       console.error('html2pdf is not available.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 p-8 flex flex-col items-center">
//       <div className='mt-40'>
//         <h1 className="text-3xl font-bold text-white mb-6">Upload Video for Attendance Analysis</h1>
//         <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
//           <div className="mb-4">
//             <label className="block text-white text-sm font-medium mb-2">Select Video:</label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={handleVideoChange}
//               className="block w-full text-sm text-gray-400 border border-gray-700 rounded p-2 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {videoUrl && (
//             <div className="mb-4">
//               <label className="block text-white text-sm font-medium mb-2">Video Preview:</label>
//               <video
//                 src={videoUrl}
//                 controls
//                 className="w-full h-64 bg-gray-700 rounded"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Submit 
//           </button>

//           {message && <p className="mt-4 text-center text-red-400">{message}</p>}
//         </form>

//         {attendanceData.length > 0 && (
//           <div className="mt-6 w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold text-white mb-4">Attendance Results</h2>
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Attendance Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-800 divide-y divide-gray-700">
//                 {attendanceData.map((item, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 text-sm font-medium text-white">{item["Student Name"]}</td>
//                     <td className="px-6 py-4 text-sm text-gray-400">{item["Attendance Status"]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button
//               onClick={downloadPDF}
//               className="mt-6 p-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
//             >
//               Download PDF
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import html2pdf only on the client-side
const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false });

const AdminPage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<Array<{ "Student Name": string; "Attendance Status": string }>>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const router = useRouter();
  const params = useParams();
  const teacherUsername = params?.teachername;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      setMessage('Please select a video to upload.');
      return;
    }

    setIsLoading(true); // Set loading state to true

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:5001/api/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setAttendanceData(response.data.attendance);
        setMessage('Video uploaded successfully!');
        await axios.post('/api/mark-attendance', {
          teacherUsername,
          attendanceData: response.data.attendance,
        });
      } else {
        setMessage('Failed to process video.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload video.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const downloadPDF = async () => {
    if (attendanceData.length === 0) {
      return;
    }

    const element = document.createElement('div');
    element.classList.add('pdf-container');
    element.innerHTML = `
      <h2>Attendance Results</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Student Name</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          ${attendanceData.map(item => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item["Student Name"]}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item["Attendance Status"]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Ensure html2pdf is imported and available
    if (html2pdf) {
      html2pdf()
        .from(element)
        .save('attendance_result.pdf');
    } else {
      console.error('html2pdf is not available.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8 flex flex-col items-center">
      <div className='mt-40'>
        <h1 className="text-3xl font-bold text-white mb-6">Upload Video for Attendance Analysis</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Select Video:</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="block w-full text-sm text-gray-400 border border-gray-700 rounded p-2 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {videoUrl && (
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">Video Preview:</label>
              <video
                src={videoUrl}
                controls
                className="w-full h-64 bg-gray-700 rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isLoading ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>

          {message && <p className="mt-4 text-center text-red-400">{message}</p>}
        </form>

        {attendanceData.length > 0 && (
          <div className="mt-6 w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Attendance Results</h2>
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {attendanceData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-white">{item["Student Name"]}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{item["Attendance Status"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={downloadPDF}
              className="mt-6 p-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
