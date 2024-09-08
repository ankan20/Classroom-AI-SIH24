"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useRouter, useParams } from 'next/navigation';
// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NoiseDetection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [data, setData] = useState<{ noise_duration: number; voice_duration: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();
   const params = useParams();
   const teacherUsername = params?.teachername;
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setData(null);

    // Check if a file is selected
    if (!selectedFile) {
      setError('Please select a video file.');
      setLoading(false);
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      // Send the video file to the backend
      const response = await axios.post('http://localhost:5001/api/noice-ditecttion', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Set the received data
      setData(response.data);
      console.log(data,teacherUsername)
      if (response.data && teacherUsername) {
        const totalDuration = response.data.noise_duration + response.data.voice_duration;
        const noisePercentage = (response.data.noise_duration / totalDuration) * 100;
        const voicePercentage = (response.data.voice_duration / totalDuration) * 100;
  
        // Send the percentage data to the API
        await axios.post('/api/noice-teacher', {
          teacherUsername,
          noicePercentage: noisePercentage.toFixed(2),
          voicePercentage: voicePercentage.toFixed(2),
        })
        .then(response => {
          console.log('Teacher data updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating teacher data:', error);
        });
      }
    } catch (err) {
      setError('Error processing the video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the graph
  const chartData = data
    ? {
        labels: ['Noise Duration', 'Voice Duration'],
        datasets: [
          {
            label: 'Duration (seconds)',
            data: [data.noise_duration, data.voice_duration],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 2,
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Noise Detection</h1>

      {/* File upload form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-4 w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          {loading ? 'Processing...' : 'Upload Video'}
        </button>
      </form>

      {/* Error message */}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {/* Results Table */}
      {data && (
        <div className="max-w-lg mx-auto mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Results</h2>
          <table className="w-full bg-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-600 border-b border-gray-500 text-left">Status</th>
                <th className="py-3 px-4 bg-gray-600 border-b border-gray-500 text-left">Duration (seconds)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-500">Noise</td>
                <td className="py-2 px-4 border-b border-gray-500">
                  
                {data.noise_duration !== undefined ? data.noise_duration.toFixed(2) : 'N/A'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-500">Voice</td>
                <td className="py-2 px-4 border-b border-gray-500">
                {data.voice_duration !== undefined ? data.voice_duration.toFixed(2) : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Graph */}
      {data && chartData && (
        <div className="mt-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Graph</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoiseDetection;
