import { useState, useEffect } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/files`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP error! status: ${res.status}, response: ${text}`);
        }
        const data = await res.json();
        if (data.success) {
          setUploadedFiles(data.files || []);
        } else {
          setMessage('Failed to fetch files: ' + (data.error || 'Unknown error'));
          console.error('Fetch error response:', data);
        }
      } catch (err) {
        setMessage('An error occurred while fetching files: ' + err.message);
        console.error('Fetch error details:', err);
      }
    };
    if (localStorage.getItem('isLoggedIn')) fetchFiles();
  }, []);

  const handleUpload = async (type) => {
    if (!file) {
      setMessage('Please choose a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    const endpoint = type === 'image' ? 'storeImages' : 'storeDocuments';
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Uploaded ${type} successfully!`);
        setUploadedFiles([...uploadedFiles, { ...data.file, type }]);
        setFile(null);
      } else {
        setMessage(data.error || 'Upload failed!');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (filename) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/delete/${filename}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setUploadedFiles(uploadedFiles.filter(file => file.filename !== filename));
        setMessage('File deleted successfully!');
      } else {
        setMessage('Failed to delete file: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      setMessage('An error occurred while deleting the file: ' + err.message);
    }
  };

  const handleDownload = (filename) => {
    window.open(`${import.meta.env.VITE_API_URL}/api/download/${filename}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Upload Files</h1>
        <div className="bg-white p-6 rounded-xl shadow-xl mb-8">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {file && <p className="text-gray-600 mb-4">{file.name}</p>}
          {message && <p className={message.includes('success') ? 'text-green-600' : 'text-red-600'}>{message}</p>}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => handleUpload('image')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Upload Image
            </button>
            <button
              onClick={() => handleUpload('document')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Upload Document
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Uploaded Files</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
              <p className="text-gray-700 font-medium mb-2 truncate">{file.filename}</p>
              {file.type === 'image' && (
                <img
                  src={`${import.meta.env.VITE_API_URL}/api/download/${file.filename}`}
                  alt={file.filename}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleDownload(file.filename)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  title="Download"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14v-4h-2v4H7l5 5 5-5h-2v-4h-2v4h-2zm0-10v4h2v-4h3l-5-5-5 5h3z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(file.filename)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a1 1 0 00-1 1v2h12V5a1 1 0 00-1-1H7zm-2 5v10a1 1 0 001 1h12a1 1 0 001-1V9H5zm4 1h8v8H9V10z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadForm;