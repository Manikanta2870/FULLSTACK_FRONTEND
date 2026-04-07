import React, { useState, useEffect } from 'react';
import '../AdminProfessional.css';

const API_URL = import.meta.env.VITE_API_URL;

function ViewPollingStations() {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/adminapi/polling-station/all`);
      if (!response.ok) {
        setMessage('❌ Failed to load polling stations');
        return;
      }
      const data = await response.json();
      setStations(data);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const filteredStations = stations.filter(station => {
    const matchSearch =
      station.stationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDistrict = !filterDistrict || station.district === filterDistrict;
    return matchSearch && matchDistrict;
  });

  const districts = [...new Set(stations.map(s => s.district))];

  const deleteStation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this station?')) return;

    try {
      const response = await fetch(`${API_URL}/adminapi/polling-station/delete?id=${id}`, {
        method: 'DELETE'
      });

      const text = await response.text();
      if (!response.ok) {
        setMessage(`❌ ${text || 'Delete failed'}`);
        return;
      }

      setMessage('✅ Polling station deleted successfully');
      setStations(prev => prev.filter(s => s.id !== id));
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    }
  };

  return (
    <div className="admin-view-container">
      <h2>All Polling Stations</h2>

      {message && (
        <div className={`admin-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="admin-filters">
        <input
          type="text"
          placeholder="🔍 Search by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search"
        />

        <select
          value={filterDistrict}
          onChange={(e) => setFilterDistrict(e.target.value)}
          className="admin-filter-select"
        >
          <option value="">All Districts</option>
          {districts.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <button className="admin-btn btn-secondary" onClick={loadStations}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="admin-empty-state"><p>⏳ Loading stations...</p></div>
      ) : filteredStations.length === 0 ? (
        <div className="admin-empty-state">
          <p>📭 No polling stations found</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Station Name</th>
                <th>Location</th>
                <th>District</th>
                <th>State</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map((station) => (
                <tr key={station.id}>
                  <td><strong>{station.stationName}</strong></td>
                  <td>{station.location}</td>
                  <td>{station.district}</td>
                  <td>{station.state || '-'}</td>
                  <td>{station.capacity || '-'}</td>
                  <td>
                    <button
                      className="admin-btn btn-sm btn-delete"
                      onClick={() => deleteStation(station.id)}
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

      <p className="admin-count">Total: {filteredStations.length} stations</p>
    </div>
  );
}

export default ViewPollingStations;
