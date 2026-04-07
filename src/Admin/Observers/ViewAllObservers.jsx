import React, { useState, useEffect } from 'react';
import '../AdminProfessional.css';

const API_URL = import.meta.env.VITE_API_URL;

function ViewAllObservers() {
  const [observers, setObservers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadObservers();
  }, []);

  const loadObservers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/adminapi/observer/all`);
      if (!response.ok) {
        setMessage('❌ Failed to load observers');
        return;
      }
      const data = await response.json();
      setObservers(data);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const filteredObservers = observers.filter(obs => {
    const matchSearch =
      (obs.observerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      obs.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !filterStatus || obs.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const deleteObserver = async (email) => {
    if (!window.confirm('Are you sure you want to delete this observer?')) return;

    try {
      const response = await fetch(`${API_URL}/adminapi/observer/delete?email=${encodeURIComponent(email)}`, {
        method: 'DELETE'
      });

      const text = await response.text();
      if (!response.ok) {
        setMessage(`❌ ${text || 'Delete failed'}`);
        return;
      }

      setMessage('✅ Observer deleted successfully');
      setObservers(prev => prev.filter(o => o.email !== email));
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: '#28a745',
      inactive: '#6c757d',
      'on-duty': '#007bff'
    };
    return (
      <span style={{ backgroundColor: colors[status] || '#6c757d' }} className="admin-status-badge">
        {status}
      </span>
    );
  };

  return (
    <div className="admin-view-container">
      <h2>All Observers</h2>

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
          <option value="on-duty">On Duty</option>
        </select>

        <button className="admin-btn btn-secondary" onClick={loadObservers}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="admin-empty-state"><p>⏳ Loading observers...</p></div>
      ) : filteredObservers.length === 0 ? (
        <div className="admin-empty-state">
          <p>👤 No observers found</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Observer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>District</th>
                <th>Assigned Station</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredObservers.map((obs) => (
                <tr key={obs.email}>
                  <td><strong>{obs.observerName || '-'}</strong></td>
                  <td>{obs.email}</td>
                  <td>{obs.phone || '-'}</td>
                  <td>{obs.district || '-'}</td>
                  <td>{obs.assignedStation || 'Not Assigned'}</td>
                  <td>{getStatusBadge(obs.status)}</td>
                  <td>
                    <button
                      className="admin-btn btn-sm btn-delete"
                      onClick={() => deleteObserver(obs.email)}
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

      <p className="admin-count">Total: {filteredObservers.length} observers</p>
    </div>
  );
}

export default ViewAllObservers;
