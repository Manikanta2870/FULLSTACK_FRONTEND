import React, { useState, useEffect } from 'react';
import '../AdminProfessional.css';

const API_URL = import.meta.env.VITE_API_URL;

function ViewAllAnalysts() {
  const [analysts, setAnalysts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAnalysts();
  }, []);

  const loadAnalysts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/adminapi/analyst/all`);
      if (!response.ok) {
        setMessage('❌ Failed to load analysts');
        return;
      }
      const data = await response.json();
      setAnalysts(data);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const filteredAnalysts = analysts.filter(analyst => {
    const matchSearch =
      (analyst.analystName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      analyst.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !filterStatus || analyst.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const deleteAnalyst = async (email) => {
    if (!window.confirm('Are you sure you want to delete this analyst?')) return;

    try {
      const response = await fetch(`${API_URL}/adminapi/analyst/delete?email=${encodeURIComponent(email)}`, {
        method: 'DELETE'
      });

      const text = await response.text();
      if (!response.ok) {
        setMessage(`❌ ${text || 'Delete failed'}`);
        return;
      }

      setMessage('✅ Analyst deleted successfully');
      setAnalysts(prev => prev.filter(a => a.email !== email));
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: '#28a745',
      inactive: '#6c757d',
      'on-leave': '#ffc107'
    };
    return (
      <span style={{ backgroundColor: colors[status] || '#6c757d' }} className="admin-status-badge">
        {status}
      </span>
    );
  };

  return (
    <div className="admin-view-container">
      <h2>All Data Analysts</h2>

      {message && (
        <div className={`admin-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="admin-filters">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="admin-filter-select"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-leave">On Leave</option>
        </select>

        <button className="admin-btn btn-secondary" onClick={loadAnalysts}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="admin-empty-state"><p>⏳ Loading analysts...</p></div>
      ) : filteredAnalysts.length === 0 ? (
        <div className="admin-empty-state">
          <p>📊 No data analysts found</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Analyst Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Expertise</th>
                <th>Assigned District</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnalysts.map((analyst) => (
                <tr key={analyst.email}>
                  <td><strong>{analyst.analystName || '-'}</strong></td>
                  <td>{analyst.email}</td>
                  <td>{analyst.phone || '-'}</td>
                  <td>{analyst.expertise || '-'}</td>
                  <td>{analyst.assignedDistrict || 'Not Assigned'}</td>
                  <td>{getStatusBadge(analyst.status)}</td>
                  <td>
                    <button
                      className="admin-btn btn-sm btn-delete"
                      onClick={() => deleteAnalyst(analyst.email)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="admin-count">Total: {filteredAnalysts.length} analysts</p>
    </div>
  );
}

export default ViewAllAnalysts;
