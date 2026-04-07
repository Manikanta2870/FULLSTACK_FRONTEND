import React, { useState, useEffect } from 'react';
import '../AdminProfessional.css';

const API_URL = import.meta.env.VITE_API_URL;

function AssignObserver() {
  const [observers, setObservers] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedObserver, setSelectedObserver] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [obsRes, statRes] = await Promise.all([
        fetch(`${API_URL}/adminapi/observer/all`),
        fetch(`${API_URL}/adminapi/polling-station/all`)
      ]);

      if (obsRes.ok) {
        const obsData = await obsRes.json();
        setObservers(obsData);
      }

      if (statRes.ok) {
        const statData = await statRes.json();
        setStations(statData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!selectedObserver || !selectedStation) {
      setMessage('❌ Please select both observer and station');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/adminapi/observer/assign-station`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: selectedObserver, assignedStation: selectedStation })
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage(`❌ ${text || 'Assignment failed'}`);
        return;
      }

      setMessage('✅ Observer assigned successfully!');
      setSelectedObserver('');
      setSelectedStation('');
      loadData();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Assign Observer to Polling Station</h2>

      {message && (
        <div className={`admin-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleAssign} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>Select Observer *</label>
            <select
              value={selectedObserver}
              onChange={(e) => setSelectedObserver(e.target.value)}
              required
            >
              <option value="">-- Choose Observer --</option>
              {observers.map(obs => (
                <option key={obs.email} value={obs.email}>
                  {obs.observerName || obs.email} ({obs.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Polling Station *</label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              required
            >
              <option value="">-- Choose Station --</option>
              {stations.map(station => (
                <option key={station.id} value={station.stationName}>
                  {station.stationName} - {station.location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="admin-btn btn-primary" disabled={loading}>
          {loading ? '⏳ Assigning...' : '✓ Assign Observer'}
        </button>
      </form>

      <div className="admin-info-box">
        <h3>Current Assignments</h3>
        {observers.filter(o => o.assignedStation).length === 0 ? (
          <p>No assignments yet</p>
        ) : (
          <ul>
            {observers.filter(o => o.assignedStation).map(obs => (
              <li key={obs.email}>
                <strong>{obs.observerName || obs.email}</strong> → {obs.assignedStation}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AssignObserver;
