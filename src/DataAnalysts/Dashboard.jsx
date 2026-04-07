import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DataAnalystProfessional.css';
import AnalystSidebar from './AnalystSidebar';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const sampleDistricts = [
    { name: 'Central District', registeredVoters: 12500, turnout: '78%', activeStations: 22 },
    { name: 'North District', registeredVoters: 9800, turnout: '72%', activeStations: 16 },
    { name: 'West District', registeredVoters: 8400, turnout: '69%', activeStations: 14 }
  ];

  const sampleStates = [
    { name: 'Telangana', totalDistricts: 20, totalVoters: 180000, turnout: '75%' },
    { name: 'Karnataka', totalDistricts: 30, totalVoters: 210000, turnout: '73%' },
    { name: 'Maharashtra', totalDistricts: 35, totalVoters: 250000, turnout: '77%' }
  ];

  const sampleAnalytics = [
    { title: 'Total Votes Counted', value: '1,875,000' },
    { title: 'Average Turnout', value: '74.6%' },
    { title: 'Pending Reports', value: '14' }
  ];

  const analystProfile = {
    name: 'Data Analyst',
    email: 'analyst@system.com',
    phone: '+91 98765 43210',
    analystId: 'ANAL-' + Date.now(),
    status: 'Active',
    department: 'Analytics',
    accessLevel: 'Data Analysis'
  };

  const analystInitials = analystProfile.name
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
      case 'districtData':
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>District Data Analysis</h2>
                <p>Analyze election data by district</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
              {sampleDistricts.map((district) => (
                <div
                  key={district.name}
                  style={{
                    padding: '18px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)'
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0' }}>{district.name}</h3>
                  <p style={{ margin: '6px 0' }}><strong>Registered Voters:</strong> {district.registeredVoters.toLocaleString()}</p>
                  <p style={{ margin: '6px 0' }}><strong>Turnout:</strong> {district.turnout}</p>
                  <p style={{ margin: '6px 0' }}><strong>Active Stations:</strong> {district.activeStations}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'stateData':
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>State Data Analysis</h2>
                <p>Analyze election data by state</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
              {sampleStates.map((state) => (
                <div
                  key={state.name}
                  style={{
                    padding: '18px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)'
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0' }}>{state.name}</h3>
                  <p style={{ margin: '6px 0' }}><strong>Districts:</strong> {state.totalDistricts}</p>
                  <p style={{ margin: '6px 0' }}><strong>Total Voters:</strong> {state.totalVoters.toLocaleString()}</p>
                  <p style={{ margin: '6px 0' }}><strong>Turnout:</strong> {state.turnout}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h2>Advanced Analytics</h2>
                <p>In-depth election analysis and insights</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '16px', marginTop: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {sampleAnalytics.map((metric) => (
                <div
                  key={metric.title}
                  style={{
                    padding: '18px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)'
                  }}
                >
                  <p style={{ margin: '0 0 8px 0', color: '#475569', fontWeight: 600 }}>{metric.title}</p>
                  <h3 style={{ margin: 0 }}>{metric.value}</h3>
                </div>
              ))}
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
                <p>Welcome to the Data Analyst Panel. Analyze election data and generate insights.</p>
              </div>
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-icon">📍</div>
                <h3>District Data</h3>
                <p>Analyze election data by district</p>
                <button className="card-btn" onClick={() => setActiveTab('districtData')}>
                  View District Data
                </button>
              </div>
              <div className="dashboard-card">
                <div className="card-icon">🗺️</div>
                <h3>State Data</h3>
                <p>Analyze election data by state</p>
                <button className="card-btn" onClick={() => setActiveTab('stateData')}>
                  View State Data
                </button>
              </div>
              <div className="dashboard-card">
                <div className="card-icon">📈</div>
                <h3>Advanced Analytics</h3>
                <p>In-depth election analysis</p>
                <button className="card-btn" onClick={() => setActiveTab('analytics')}>
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="analyst-dashboard-wrapper">
      <div className="analyst-header">
        <div className="analyst-header-left">
          <h1>Election Monitoring System</h1>
          <p style={{ marginTop: '4px', fontSize: '0.95rem', opacity: '0.9' }}>Data Analyst Panel</p>
        </div>
        <div className="analyst-header-right">
          <div ref={profileDropdownRef} style={{ position: 'relative' }}>
            <button
              className="profile-avatar"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              title="View Profile"
            >
              {analystInitials}
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info-card">
                  <h4>Profile Information</h4>
                  <p><strong>Name:</strong> {analystProfile.name}</p>
                  <p><strong>Email:</strong> {analystProfile.email}</p>
                  <p><strong>Phone:</strong> {analystProfile.phone}</p>
                  <p><strong>Analyst ID:</strong> {analystProfile.analystId}</p>
                  <p><strong>Status:</strong> <span className="status-active">{analystProfile.status}</span></p>
                  <p><strong>Department:</strong> {analystProfile.department}</p>
                  <p><strong>Access Level:</strong> {analystProfile.accessLevel}</p>
                </div>
                <button className="dropdown-btn danger" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="analyst-main-layout">
        <AnalystSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="analyst-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
