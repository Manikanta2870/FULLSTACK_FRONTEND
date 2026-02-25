import { useNavigate } from 'react-router-dom';
import './DataAnalystsDashboard.css';

function DataAnalystsDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleSwitchRole = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="analysts-dashboard">
      {/* Header */}
      <header className="portal-header">
        <div className="header-left">
          <div className="header-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M 9 12 L 11 14 L 15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="header-info">
            <h1 className="header-title">Election Monitoring System</h1>
            <p className="header-subtitle">Data Analytics Dashboard</p>
          </div>
        </div>
        
        <div className="header-right">
          <span className="role-badge">Data Analyst</span>
          <button className="switch-role-btn" onClick={handleSwitchRole}>
            <span className="icon">⇄</span> Switch Role
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="portal-main">
        <div className="portal-container">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-title-section">
              <h2 className="page-title">Data Analytics Dashboard</h2>
              <p className="page-description">Election data analysis and insights</p>
            </div>
            <button className="status-btn online">
              System Status: Online
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Data Records</h3>
                <p className="stat-value">15,847</p>
              </div>
              <div className="stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 3 5 h 18 M 3 5 v 14 a 2 2 0 0 0 2 2 h 14 a 2 2 0 0 0 2 -2 V 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M 7 9 h 10 M 7 13 h 10 M 7 17 h 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Analysis Reports</h3>
                <p className="stat-value">42</p>
              </div>
              <div className="stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 3 3 h 18 v 18 H 3 Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 7 15 L 12 9 L 17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Processed Data</h3>
                <p className="stat-value">98.5%</p>
              </div>
              <div className="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 8 12 L 11 15 L 16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Last Updated</h3>
                <p className="stat-value">2 hours</p>
              </div>
              <div className="stat-icon orange">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 12 6 v 6 l 4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DataAnalystsDashboard;
