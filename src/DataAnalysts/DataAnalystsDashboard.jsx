import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DataAnalystsDashboard.css';

function DataAnalystsDashboard({ onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('turnout');

  const tabItems = [
    { id: 'turnout', label: 'Turnout Trends' },
    { id: 'district', label: 'District Analysis' },
    { id: 'demographics', label: 'Demographics' },
    { id: 'issues', label: 'Issue Analytics' },
    { id: 'predictions', label: 'Predictions' }
  ];

  const districtPerformance = [
    { name: 'Downtown District', voted: 8230, registered: 12000, rate: 68.6, status: 'high' },
    { name: 'North District', voted: 7540, registered: 10400, rate: 72.5, status: 'high' },
    { name: 'South District', voted: 6100, registered: 9200, rate: 66.3, status: 'medium' },
    { name: 'East District', voted: 5680, registered: 8700, rate: 65.2, status: 'medium' }
  ];

  const ageBreakdown = [
    { group: '18-24 years', count: 4760, rate: 58 },
    { group: '25-34 years', count: 6210, rate: 76 },
    { group: '35-44 years', count: 5390, rate: 65 },
    { group: '45-54 years', count: 4920, rate: 61 },
    { group: '55-64 years', count: 4180, rate: 52 },
    { group: '65+ years', count: 2100, rate: 38 }
  ];

  const issues = [
    { label: 'Long Queue', count: 45, pct: 28 },
    { label: 'Equipment Failure', count: 32, pct: 20 },
    { label: 'Accessibility', count: 23, pct: 15 },
    { label: 'Procedural Violation', count: 18, pct: 11 },
    { label: 'Missing Materials', count: 28, pct: 17 },
    { label: 'Other', count: 15, pct: 9 }
  ];

  const handleSwitchRole = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/');
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'turnout') {
      return (
        <div className="analysis-panel">
          <div className="panel-card">
            <h4>Real-Time Voter Turnout</h4>
            <p className="panel-subtext">Hourly voter participation throughout the day</p>
            <div className="line-chart-placeholder">
              {[6, 14, 24, 35, 47, 58, 65, 73, 82, 94].map((value, index) => (
                <div key={index} className="line-point-row">
                  <span className="line-point-label">{`${7 + index}:00`}</span>
                  <div className="line-point-track">
                    <div className="line-point-fill" style={{ width: `${value}%` }} />
                  </div>
                  <span className="line-point-value">{value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="split-grid">
            <div className="panel-card">
              <h4>Peak Voting Hours</h4>
              <div className="mini-list">
                <div className="mini-list-item">
                  <strong>4:00 PM - 5:00 PM</strong>
                  <span>1,200 voters</span>
                </div>
                <div className="mini-list-item">
                  <strong>12:00 PM - 1:00 PM</strong>
                  <span>1,000 voters</span>
                </div>
                <div className="mini-list-item">
                  <strong>8:00 AM - 9:00 AM</strong>
                  <span>850 voters</span>
                </div>
              </div>
            </div>

            <div className="panel-card">
              <h4>Turnout Comparison</h4>
              <div className="comparison-row">
                <span>2026 Current</span>
                <div className="bar-track"><div className="bar-fill blue" style={{ width: '62.3%' }} /></div>
                <strong>62.3%</strong>
              </div>
              <div className="comparison-row">
                <span>2024 Final</span>
                <div className="bar-track"><div className="bar-fill gray" style={{ width: '68.2%' }} /></div>
                <strong>68.2%</strong>
              </div>
              <div className="comparison-row">
                <span>2022 Final</span>
                <div className="bar-track"><div className="bar-fill gray" style={{ width: '71.5%' }} /></div>
                <strong>71.5%</strong>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'district') {
      return (
        <div className="analysis-panel">
          <div className="panel-card">
            <h4>District Vote Comparison</h4>
            <p className="panel-subtext">Registered voters vs actual turnout</p>
            {districtPerformance.map((district) => (
              <div key={district.name} className="comparison-row district-row">
                <span>{district.name}</span>
                <div className="bar-track"><div className="bar-fill blue" style={{ width: `${district.rate}%` }} /></div>
                <strong>{`${district.rate}%`}</strong>
              </div>
            ))}
          </div>

          <div className="panel-card">
            <h4>District Performance Summary</h4>
            {districtPerformance.map((district) => (
              <div key={`${district.name}-summary`} className="district-summary-row">
                <div>
                  <p className="meta-title">{district.name}</p>
                  <p className="meta-subtitle">{`${district.voted.toLocaleString()} voted / ${district.registered.toLocaleString()} registered`}</p>
                </div>
                <span className={`status-pill ${district.status}`}>{district.status}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'demographics') {
      return (
        <div className="analysis-panel">
          <div className="split-grid">
            <div className="panel-card">
              <h4>Voter Demographics by Age</h4>
              <div className="pie-placeholder" />
            </div>

            <div className="panel-card">
              <h4>Age Group Breakdown</h4>
              {ageBreakdown.map((item) => (
                <div key={item.group} className="comparison-row">
                  <span>{item.group}</span>
                  <div className="bar-track"><div className="bar-fill teal" style={{ width: `${item.rate}%` }} /></div>
                  <strong>{item.count.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <h4>Geographic Analysis</h4>
            <div className="geo-grid">
              <div className="geo-card">
                <p>Urban Areas</p>
                <strong>68.5%</strong>
              </div>
              <div className="geo-card">
                <p>Suburban Areas</p>
                <strong>72.3%</strong>
              </div>
              <div className="geo-card">
                <p>Rural Areas</p>
                <strong>54.2%</strong>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'issues') {
      return (
        <div className="analysis-panel">
          <div className="split-grid">
            <div className="panel-card">
              <h4>Issue Distribution</h4>
              <div className="pie-placeholder issues" />
            </div>

            <div className="panel-card">
              <h4>Issue Summary</h4>
              {issues.map((issue) => (
                <div key={issue.label} className="comparison-row">
                  <span>{issue.label}</span>
                  <strong>{issue.count}</strong>
                  <span>{`${issue.pct}%`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <h4>Issue Resolution Status</h4>
            <div className="resolution-grid">
              <div className="resolution-card open">
                <p>Open</p>
                <strong>2</strong>
              </div>
              <div className="resolution-card progress">
                <p>In Progress</p>
                <strong>2</strong>
              </div>
              <div className="resolution-card resolved">
                <p>Resolved</p>
                <strong>1</strong>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="analysis-panel">
        <div className="panel-card">
          <h4>Turnout Forecast</h4>
          <div className="forecast-grid">
            <div className="forecast-card conservative">
              <p>Conservative Estimate</p>
              <strong>65.2%</strong>
            </div>
            <div className="forecast-card expected">
              <p>Expected Forecast</p>
              <strong>69.8%</strong>
            </div>
            <div className="forecast-card optimistic">
              <p>Optimistic Projection</p>
              <strong>73.5%</strong>
            </div>
          </div>
        </div>

        <div className="panel-card">
          <h4>Key Insights & Trends</h4>
          <div className="insights-list">
            <div className="insight-item">Strong Morning Turnout - early participation is trending up by 12%.</div>
            <div className="insight-item">Youth Engagement Up - 18-24 age group shows increased participation.</div>
            <div className="insight-item">Urban-Suburban Split - suburban turnout is outperforming urban centers.</div>
            <div className="insight-item">Afternoon Surge Expected - turnout expected to peak between 4-6 PM.</div>
          </div>
        </div>
      </div>
    );
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
          <div className="dashboard-title-wrap">
            <div>
              <h2 className="page-title">Data Analyst Dashboard</h2>
              <p className="page-description">Real-time analytics and comprehensive election insights</p>
            </div>
            <div className="top-actions">
              <select className="small-select">
                <option>PDF</option>
                <option>CSV</option>
              </select>
              <button className="switch-role-btn export-btn">Export Data</button>
            </div>
          </div>

          <div className="page-header">
            <div className="page-title-section">
              <label className="election-label">Analyzing Election</label>
              <select className="election-select">
                <option>State Governor Election - California (ongoing)</option>
                <option>City Council Election - District 5</option>
              </select>
            </div>
            <button className="switch-role-btn">Generate Full Report</button>
          </div>

          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Total Registered</h3>
                <p className="stat-value">44,200</p>
              </div>
              <div className="stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 4 20 v -2 a 4 4 0 0 1 4 -4 h 8 a 4 4 0 0 1 4 4 v 2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Total Voted</h3>
                <p className="stat-value">27,550</p>
              </div>
              <div className="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 5 14 l 4 -4 l 3 3 l 7 -7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Turnout Rate</h3>
                <p className="stat-value">62.3%</p>
              </div>
              <div className="stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 4 19 h 16" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 7 16 v -5 M 12 16 v -8 M 17 16 v -3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-label">Issues Reported</h3>
                <p className="stat-value">5</p>
              </div>
              <div className="stat-icon orange">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 12 8 v 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16.5" r="1" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="analytics-tabs">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}

export default DataAnalystsDashboard;
