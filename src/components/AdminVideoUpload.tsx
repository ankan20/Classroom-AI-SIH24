import { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
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
      await axios.post('/api/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Video uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload video.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8 flex flex-col items-center">
      <div className='mt-40'>
      <h1 className="text-3xl font-bold text-white mb-6">Upload Video for Analysis</h1>
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
      </div>
    </div>
  );
};

export default AdminPage;
