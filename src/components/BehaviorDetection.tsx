// import { useState } from 'react';
// import axios from 'axios';

// interface Behavior {
//   looking_forward?: number;
//   reading?: number;
//   turn_around?: number;
//   sleeping?: number;
//   using_phone?: number;
//   writing?: number;
//   hand_raising?: number;
// }

// interface BehaviorData {
//   [student: string]: Behavior;
// }

// const BehaviorDetection: React.FC = () => {
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
//   const [behaviorData, setBehaviorData] = useState<BehaviorData | null>(null);
//   const [duration, setDuration] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setVideoFile(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!videoFile) {
//       setError('Please select a video file.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('video', videoFile);

//     try {
//       const response = await axios.post('http://localhost:5001/api/behavior-detection', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       // Handle response
//       setUploadedVideo(response.data.video_path);
//       setBehaviorData(response.data.behavior_data);
//       setDuration(response.data.duration);
//     } catch (error) {
//       setError('Failed to process the video.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDuration = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}m ${secs}s`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <header className="bg-gray-800 py-4">
//         <div className="container mx-auto text-center">
//           <h1 className="text-3xl font-bold">Behavior Detection</h1>
//         </div>
//       </header>

//       <main className="py-8">
//         <div className="container mx-auto px-4">
//           {/* Video Upload Section */}
//           <section className="mb-8">
//             <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleFileChange}
//                 className="mb-4"
//               />
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50"
//               >
//                 {loading ? 'Processing...' : 'Submit Video'}
//               </button>
//               {error && <p className="text-red-500 mt-2">{error}</p>}
//             </div>
//           </section>

          

//           {/* Behavior Data Section */}
//           {behaviorData && Object.keys(behaviorData).length > 0 && (
//             <section>
//               <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4">Behavior Data</h2>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-600">
//                     <thead>
//                       <tr>
//                         <th className="py-2 px-4 text-left text-gray-400">Student</th>
//                         <th className="py-2 px-4 text-left text-gray-400">Looking Forward</th>
//                         <th className="py-2 px-4 text-left text-gray-400">Reading</th>
//                         <th className="py-2 px-4 text-left text-gray-400">Turning Around</th>
//                         <th className="py-2 px-4 text-left text-gray-400">Sleeping</th>
//                         <th className="py-2 px-4 text-left text-gray-400">Using Phone</th>
//                         <th className="py-2 px-4 text-left text-gray-400">Writing</th>
//                         <th className="py-2 px-4 text-left text-gray-400">Hand Raising</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-600">
//                       {Object.entries(behaviorData).map(([student, behaviors]) => (
//                         <tr key={student}>
//                           <td className="py-2 px-4">{student}</td>
//                           <td className="py-2 px-4">{behaviors.looking_forward || 0}</td>
//                           <td className="py-2 px-4">{behaviors.reading || 0}</td>
//                           <td className="py-2 px-4">{behaviors.turn_around || 0}</td>
//                           <td className="py-2 px-4">{behaviors.sleeping || 0}</td>
//                           <td className="py-2 px-4">{behaviors.using_phone || 0}</td>
//                           <td className="py-2 px-4">{behaviors.writing || 0}</td>
//                           <td className="py-2 px-4">{behaviors.hand_raising || 0}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </section>
//           )}
//         </div>
//       </main>

      
//     </div>
//   );
// };

// export default BehaviorDetection;




import { useState } from 'react';
import axios from 'axios';

interface Behavior {
  looking_forward?: number;
  reading?: number;
  turn_around?: number;
  sleeping?: number;
  using_phone?: number;
  writing?: number;
  hand_raising?: number;
}

interface BehaviorData {
  [student: string]: Behavior;
}

const BehaviorDetection: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [behaviorData, setBehaviorData] = useState<BehaviorData | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      setError('Please select a video file.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:5001/api/behavior-detection', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Handle response
      setUploadedVideo(response.data.video_path);
      setBehaviorData(response.data.behavior_data);
      setDuration(response.data.duration);
    } catch (error) {
      setError('Failed to process the video.');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}m ${secs}s`;
  };

  const downloadCSV = () => {
    if (!behaviorData) return;

    const headers = [
      'Student',
      'Looking Forward',
      'Reading',
      'Turning Around',
      'Sleeping',
      'Using Phone',
      'Writing',
      'Hand Raising',
    ];

    const rows = Object.entries(behaviorData).map(([student, behaviors]) => [
      student,
      behaviors.looking_forward || 0,
      behaviors.reading || 0,
      behaviors.turn_around || 0,
      behaviors.sleeping || 0,
      behaviors.using_phone || 0,
      behaviors.writing || 0,
      behaviors.hand_raising || 0,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'behavior_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Behavior Detection</h1>
        </div>
      </header>

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Video Upload Section */}
          <section className="mb-8">
            <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="mb-4"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Submit Video'}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </section>

          {/* Behavior Data Section */}
          {behaviorData && Object.keys(behaviorData).length > 0 && (
            <section>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Behavior Data</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-600">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left text-gray-400">Student</th>
                        <th className="py-2 px-4 text-left text-gray-400">Looking Forward</th>
                        <th className="py-2 px-4 text-left text-gray-400">Reading</th>
                        <th className="py-2 px-4 text-left text-gray-400">Turning Around</th>
                        <th className="py-2 px-4 text-left text-gray-400">Sleeping</th>
                        <th className="py-2 px-4 text-left text-gray-400">Using Phone</th>
                        <th className="py-2 px-4 text-left text-gray-400">Writing</th>
                        <th className="py-2 px-4 text-left text-gray-400">Hand Raising</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {Object.entries(behaviorData).map(([student, behaviors]) => (
                        <tr key={student}>
                          <td className="py-2 px-4">{student}</td>
                          <td className="py-2 px-4">{behaviors.looking_forward || 0}</td>
                          <td className="py-2 px-4">{behaviors.reading || 0}</td>
                          <td className="py-2 px-4">{behaviors.turn_around || 0}</td>
                          <td className="py-2 px-4">{behaviors.sleeping || 0}</td>
                          <td className="py-2 px-4">{behaviors.using_phone || 0}</td>
                          <td className="py-2 px-4">{behaviors.writing || 0}</td>
                          <td className="py-2 px-4">{behaviors.hand_raising || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={downloadCSV}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                >
                  Download Data
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default BehaviorDetection;
