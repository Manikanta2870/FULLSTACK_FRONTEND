import { useNavigate } from 'react-router-dom';
import './ElectionObserverDashboard.css';

function ElectionObserverDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleSwitchRole = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="observer-dashboard">
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
            <p className="header-subtitle">Election Observer Portal</p>
          </div>
        </div>
        
        <div className="header-right">
          <span className="role-badge">Election Observer</span>
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
              <h2 className="page-title">Election Observer Dashboard</h2>
              <p className="page-description">Monitor polling stations and election activities</p>
            </div>
            <button className="status-btn online">
              System Status: Online
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Polling Stations</h3>
                <p className="stat-value">347</p>
              </div>
              <div className="stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 3 21 v -2 a 4 4 0 0 1 4 -4 h 4 a 4 4 0 0 1 4 4 v 2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 16 3 h 6 v 6 h -6 Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Stations Monitored</h3>
                <p className="stat-value">328</p>
              </div>
              <div className="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 6.48 22 12 22 C 17.52 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 10 14 l 2 2 l 4 -5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Reported Issues</h3>
                <p className="stat-value">12</p>
              </div>
              <div className="stat-icon orange">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 12 2 L 2 20 h 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M 12 9 v 4 M 12 17 v 0.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Coverage</h3>
                <p className="stat-value">94.5%</p>
              </div>
              <div className="stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 12 2 L 22 8 v 6 C 22 18 12 22 12 22 C 12 22 2 18 2 14 V 8 L 12 2 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ElectionObserverDashboard;
