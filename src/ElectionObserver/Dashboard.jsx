import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ElectionObserverProfessional.css';
import ObserverSidebar from './ObserverSidebar';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [voterSearchTerm, setVoterSearchTerm] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [reportData, setReportData] = useState({
    station: 'GunturStation',
    issueType: 'Queue Delay',
    description: '',
    severity: 'Medium'
  });
  const [reportMessage, setReportMessage] = useState('');
  const profileDropdownRef = useRef(null);

  const observerProfile = {
    name: 'Observer User',
    email: 'observer@system.com',
    phone: '+91 98765 43210',
    observerId: 'OBS-' + Date.now(),
    status: 'Active',
    district: 'Central District',
    assignedStations: 5
  };

  const assignedStationsData = [
    { id: 1, name: 'GunturStation', location: 'NTR', district: 'Guntur', status: 'Active' },
    { id: 2, name: 'LBnagar', location: 'India', district: 'Hyd', status: 'Active' },
    { id: 3, name: 'Central High School', location: 'Downtown', district: 'Central District', status: 'Active' },
    { id: 4, name: 'Community Center', location: 'North Zone', district: 'Central District', status: 'Active' },
    { id: 5, name: 'City Library', location: 'South Zone', district: 'Central District', status: 'Active' }
  ];

  const voterRegistry = [
    { id: 'VID-1001', name: 'Riya Sharma', station: 'GunturStation', eligible: true, notes: 'ID matched and voter found.' },
    { id: 'VID-1002', name: 'Amit Verma', station: 'LBnagar', eligible: false, notes: 'Voter has not updated address.' },
    { id: 'VID-1003', name: 'Pooja Singh', station: 'Central High School', eligible: true, notes: 'Verified successfully.' },
    { id: 'VID-1004', name: 'Rahul Patel', station: 'Community Center', eligible: true, notes: 'Voter name matches registry.' }
  ];

  const liveMetrics = {
    totalStations: assignedStationsData.length,
    activeAlerts: 2,
    averageWait: '11 min',
    verifiedVotersToday: 1287
  };

  const observerInitials = observerProfile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'assigned':
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>Assigned Stations</h2>
                <p>View your assigned polling stations</p>
              </div>
            </div>
            <div style={{ padding: '20px', background: '#f0f9ff', borderRadius: '8px', marginBottom: '20px' }}>
              <p>You are assigned to {assignedStationsData.length} polling stations in {observerProfile.district}.</p>
            </div>
            {assignedStationsData.length === 0 ? (
              <div style={{ padding: '20px', background: '#fff7ed', borderRadius: '8px', color: '#92400e' }}>
                <p>No assigned stations are available right now.</p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px'
                }}
              >
                {assignedStationsData.map(station => (
                  <div
                    key={station.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      padding: '18px',
                      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{station.name}</h4>
                      <span style={{
                        background: '#d1fae5',
                        color: '#065f46',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>{station.status}</span>
                    </div>
                    <p style={{ margin: '6px 0', color: '#334155' }}><strong>Location:</strong> {station.location}</p>
                    <p style={{ margin: '6px 0', color: '#334155' }}><strong>District:</strong> {station.district}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'verify':
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>Verify Voters</h2>
                <p>Verify voter information and eligibility before allowing a vote.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '24px' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const found = voterRegistry.find(v => v.id === voterSearchTerm.trim().toUpperCase());
                  setVerificationResult(found || { id: voterSearchTerm.trim().toUpperCase(), notFound: true });
                }}
                style={{ background: '#ffffff', padding: '22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}
              >
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div style={{ flex: '1 1 320px' }}>
                    <label htmlFor="voterSearch" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                      Enter Voter ID
                    </label>
                    <input
                      id="voterSearch"
                      type="text"
                      value={voterSearchTerm}
                      onChange={(e) => setVoterSearchTerm(e.target.value)}
                      placeholder="e.g. VID-1001"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ padding: '12px 24px', borderRadius: '10px', background: '#6366f1', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Verify
                  </button>
                </div>
              </form>

              {verificationResult && (
                <div
                  style={{
                    background: verificationResult.notFound ? '#fff1f2' : '#ecfdf5',
                    borderRadius: '14px',
                    padding: '22px',
                    border: `1px solid ${verificationResult.notFound ? '#fecaca' : '#bbf7d0'}`
                  }}
                >
                  {verificationResult.notFound ? (
                    <>
                      <h3 style={{ marginTop: 0 }}>Voter not found</h3>
                      <p>No voter record exists for ID <strong>{verificationResult.id}</strong>. Ask the voter to check their ID details or contact the registration desk.</p>
                    </>
                  ) : (
                    <>
                      <h3 style={{ marginTop: 0 }}>{verificationResult.name}</h3>
                      <p><strong>Station:</strong> {verificationResult.station}</p>
                      <p><strong>Eligibility:</strong> {verificationResult.eligible ? 'Eligible' : 'Not eligible'}</p>
                      <p>{verificationResult.notes}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 'submission':
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>Submit Report</h2>
                <p>Log issues, incidents, and irregularities observed at polling stations.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '24px' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!reportData.description.trim()) {
                    setReportMessage('❌ Please enter a description for the issue.');
                    return;
                  }
                  setReportMessage('✅ Report submitted successfully.');
                  setReportData(prev => ({ ...prev, description: '' }));
                  setTimeout(() => setReportMessage(''), 3000);
                }}
                style={{ background: '#ffffff', padding: '22px', borderRadius: '14px', border: '1px solid #e2e8f0' }}
              >
                <div style={{ display: 'grid', gap: '18px' }}>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label htmlFor="reportStation" style={{ fontWeight: 600 }}>Polling Station</label>
                    <select
                      id="reportStation"
                      value={reportData.station}
                      onChange={(e) => setReportData(prev => ({ ...prev, station: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    >
                      {assignedStationsData.map(st => (
                        <option key={st.id} value={st.name}>{st.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label htmlFor="reportType" style={{ fontWeight: 600 }}>Issue Type</label>
                    <select
                      id="reportType"
                      value={reportData.issueType}
                      onChange={(e) => setReportData(prev => ({ ...prev, issueType: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    >
                      <option>Queue Delay</option>
                      <option>Voter ID Issue</option>
                      <option>Security Concern</option>
                      <option>Insufficient Materials</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label htmlFor="reportSeverity" style={{ fontWeight: 600 }}>Severity</label>
                    <select
                      id="reportSeverity"
                      value={reportData.severity}
                      onChange={(e) => setReportData(prev => ({ ...prev, severity: e.target.value }))}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label htmlFor="reportDescription" style={{ fontWeight: 600 }}>Description</label>
                    <textarea
                      id="reportDescription"
                      value={reportData.description}
                      onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                      rows={5}
                      placeholder="Describe the issue in detail..."
                      style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ padding: '12px 24px', borderRadius: '10px', background: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Submit Report
                  </button>
                </div>
              </form>

              {reportMessage && (
                <div style={{ padding: '18px', borderRadius: '12px', background: reportMessage.startsWith('✅') ? '#ecfdf5' : '#fef2f2', border: `1px solid ${reportMessage.startsWith('✅') ? '#bbf7d0' : '#fecaca'}` }}>
                  {reportMessage}
                </div>
              )}
            </div>
          </div>
        );
      case 'monitoring':
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>Live Monitoring</h2>
                <p>View real-time station health and alerts for your assigned area.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {[
                  { label: 'Stations Monitored', value: liveMetrics.totalStations },
                  { label: 'Active Alerts', value: liveMetrics.activeAlerts },
                  { label: 'Average Wait', value: liveMetrics.averageWait },
                  { label: 'Verified Today', value: liveMetrics.verifiedVotersToday }
                ].map((metric) => (
                  <div key={metric.label} style={{ padding: '18px', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <p style={{ marginBottom: '8px', color: '#475569', fontWeight: 600 }}>{metric.label}</p>
                    <h3 style={{ margin: 0 }}>{metric.value}</h3>
                  </div>
                ))}
              </div>

              <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px' }}>
                <h3 style={{ marginTop: 0 }}>Station Status</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {assignedStationsData.map((station) => (
                    <div key={station.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderRadius: '12px', background: '#f8fafc' }}>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>{station.name}</p>
                        <p style={{ margin: 0, color: '#475569' }}>{station.location} · {station.district}</p>
                      </div>
                      <span style={{ background: '#d1fae5', color: '#065f46', padding: '6px 12px', borderRadius: '999px', fontSize: '0.85rem' }}>{station.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>Dashboard Overview</h2>
                <p>Welcome to the Observer Panel. Monitor elections and submit reports.</p>
              </div>
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-icon">📍</div>
                <h3>Assigned Stations</h3>
                <p>View your assigned polling stations</p>
                <button className="card-btn" onClick={() => setActiveTab('assigned')}>
                  View Stations
                </button>
              </div>
              <div className="dashboard-card">
                <div className="card-icon">✓</div>
                <h3>Verify Voters</h3>
                <p>Verify voter information and eligibility</p>
                <button className="card-btn" onClick={() => setActiveTab('verify')}>
                  Verify
                </button>
              </div>
              <div className="dashboard-card">
                <div className="card-icon">📝</div>
                <h3>Submit Report</h3>
                <p>Submit your observation report</p>
                <button className="card-btn" onClick={() => setActiveTab('submission')}>
                  Submit
                </button>
              </div>
              <div className="dashboard-card">
                <div className="card-icon">🔴</div>
                <h3>Live Monitoring</h3>
                <p>Real-time election monitoring</p>
                <button className="card-btn" onClick={() => setActiveTab('monitoring')}>
                  Monitor
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="observer-dashboard-wrapper">
      <div className="observer-header">
        <div className="observer-header-left">
          <h1>Election Monitoring System</h1>
          <p style={{ marginTop: '4px', fontSize: '0.95rem', opacity: '0.9' }}>Observer Panel</p>
        </div>
        <div className="observer-header-right">
          <div ref={profileDropdownRef} style={{ position: 'relative' }}>
            <button
              className="profile-avatar"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              title="View Profile"
            >
              {observerInitials}
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info-card">
                  <h4>Profile Information</h4>
                  <p><strong>Name:</strong> {observerProfile.name}</p>
                  <p><strong>Email:</strong> {observerProfile.email}</p>
                  <p><strong>Phone:</strong> {observerProfile.phone}</p>
                  <p><strong>Observer ID:</strong> {observerProfile.observerId}</p>
                  <p><strong>Status:</strong> <span className="status-active">{observerProfile.status}</span></p>
                  <p><strong>District:</strong> {observerProfile.district}</p>
                  <p><strong>Assigned Stations:</strong> {observerProfile.assignedStations}</p>
                </div>
                <button className="dropdown-btn danger" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="observer-main-layout">
        <ObserverSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="observer-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
