import React, { useState, useEffect } from 'react';
import '../AdminProfessional.css';

const API_URL = import.meta.env.VITE_API_URL;

function AssignDistrict() {
  const [analysts, setAnalysts] = useState([]);
  const [selectedAnalyst, setSelectedAnalyst] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const districts = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  useEffect(() => {
    loadAnalysts();
  }, []);

  const loadAnalysts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/adminapi/analyst/all`);
      if (!response.ok) {
        const errorText = await response.text();
        setMessage(`❌ Failed to load analysts: ${errorText || response.statusText}`);
        setAnalysts([]);
        return;
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        setMessage('❌ No analysts found. Add a Data Analyst first.');
      }
      setAnalysts(data || []);
    } catch (error) {
      setMessage('❌ Error connecting to server');
      setAnalysts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!selectedAnalyst || !selectedDistrict) {
      setMessage('❌ Please select both analyst and district');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/adminapi/analyst/assign-district`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: selectedAnalyst, district: selectedDistrict })
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage(`❌ ${text || 'Assignment failed'}`);
        return;
      }

      setMessage('✅ District assigned successfully!');
      setSelectedAnalyst('');
      setSelectedDistrict('');
      loadAnalysts();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Assign District to Data Analyst</h2>

      {message && (
        <div className={`admin-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleAssign} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Select Data Analyst *</label>
            <select
              value={selectedAnalyst}
              onChange={(e) => setSelectedAnalyst(e.target.value)}
              required
            >
              <option value="">-- Choose Analyst --</option>
              {analysts.map(analyst => (
                <option key={analyst.email} value={analyst.email}>
                  {analyst.analystName || analyst.email} ({analyst.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select District *</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              required
            >
              <option value="">-- Choose District --</option>
              {districts.map(district => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="admin-btn btn-primary" disabled={loading}>
          {loading ? '⏳ Assigning...' : '✓ Assign District'}
        </button>
      </form>

      <div className="admin-info-box">
        <h3>Current Assignments</h3>
        {analysts.filter(a => a.assignedDistrict).length === 0 ? (
          <p>No assignments yet</p>
        ) : (
          <ul>
            {analysts.filter(a => a.assignedDistrict).map(analyst => (
              <li key={analyst.email}>
                <strong>{analyst.analystName || analyst.email}</strong> → {analyst.assignedDistrict}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AssignDistrict;
