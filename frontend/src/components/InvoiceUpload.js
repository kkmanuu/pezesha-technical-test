import React, { useState } from 'react';
import axios from 'axios';

const InvoiceUpload = () => {
  // State management for file upload
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // Clear any previous messages when selecting new file
    setError('');
    setMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that a file is selected
    if (!file) {
      setError('Please select a file');
      return;
    }

    // Create FormData object to send file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send file to backend API
      const response = await axios.post('http://localhost:5000/api/invoices/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Show success message
      setMessage(response.data.message);
      setError('');
      setFile(null);
      // Reset the form
      e.target.reset();
    } catch (err) {
      // Show error message if upload fails
      setError('Failed to upload file');
      setMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Invoice Upload</h2>
      <div className="card">
        <div className="card-body">
          {/* File upload form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Upload CSV File</label>
              {/* File input - only accepts CSV files */}
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary">
              Upload File
            </button>
          </form>
          
          {/* Success message */}
          {message && (
            <div className="alert alert-success mt-3" role="alert">
              {message}
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceUpload;