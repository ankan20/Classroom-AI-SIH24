// import { useState } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [attendanceData, setAttendanceData] = useState<Array<{ "Student Name": string; "Attendance Status": string }>>([]);
//   const [message, setMessage] = useState('');

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
//       const response = await axios.post('http://localhost:5001/api/upload-video', formData, { // Updated URL
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.status === 200) {
//         setAttendanceData(response.data.attendance);
//         setMessage('Video uploaded successfully!');
//       } else {
//         setMessage('Failed to process video.');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       setMessage('Failed to upload video.');
//     }
//   };

//   const downloadCSV = () => {
//     if (attendanceData.length === 0) {
//       return;
//     }

//     // Convert the data to CSV format
//     const csvRows = [];
//     const headers = Object.keys(attendanceData[0]);
//     csvRows.push(headers.join(',')); // Add header row

//     for (const row of attendanceData as any) {
//       csvRows.push(headers.map(header => row[header]).join(',') ); // Add data rows
//     }

//     // Create a blob with CSV data and download it
//     const csvString = csvRows.join('\n');
//     const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'attendance_result.csv');
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 p-8 flex flex-col items-center">
//       <div className='mt-40'>
//         <h1 className="text-3xl font-bold text-white mb-6">Upload Video for Analysis</h1>
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
//               onClick={downloadCSV}
//               className="mt-6 p-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
//             >
//               Download CSV
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
import { useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const AdminPage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<Array<{ "Student Name": string; "Attendance Status": string }>>([]);
  const [message, setMessage] = useState('');

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

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:5001/api/upload-video', formData, { // Updated URL
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setAttendanceData(response.data.attendance);
        setMessage('Video uploaded successfully!');
      } else {
        setMessage('Failed to process video.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload video.');
    }
  };

  const downloadPDF = () => {
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

    html2pdf()
      .from(element)
      .save('attendance_result.pdf') ;
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
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit 
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
