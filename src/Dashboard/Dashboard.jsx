import { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [role, setRole] = useState('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaarId, setAadhaarId] = useState('');
  const [otp, setOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const roles = [
    { value: 'citizen', label: 'Citizen', icon: '👤' },
    { value: 'admin', label: 'Admin', icon: '⚙️' },
    { value: 'dataanalysts', label: 'Data Analyst', icon: '📊' },
    { value: 'electionobserver', label: 'Election Observer', icon: '🔍' }
  ];

  const handleSendOtp = () => {
    if (aadhaarId && aadhaarId.length === 12) {
      setOtpSent(true);
      console.log('OTP sent to Aadhaar:', aadhaarId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'citizen') {
      console.log('Citizen login:', { aadhaarId, otp });
    } else {
      console.log(`${role} login:`, { email, password, rememberMe });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Left Side - Election Commission Info */}
      <div className="info-section">
        <div className="info-content">
          <div className="commission-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="60" height="50" rx="5" stroke="white" strokeWidth="3" fill="none"/>
                <path d="M 35 50 L 45 60 L 65 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>
          
          <h1 className="commission-title">Election Commission</h1>
          <h2 className="system-title">Monitoring System</h2>
          
          <div className="commission-info">
            <p className="tagline">Ensuring transparency, security, and integrity in every vote</p>
            
            <div className="features">
              <div className="feature-item">
                <span className="feature-icon">🔐</span>
                <span>Secure & Transparent</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Real-time Monitoring</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Verified Results</span>
              </div>
            </div>
            
            <div className="commission-details">
              <p>Established to uphold democratic principles and ensure free, fair, and transparent elections.</p>
              <p className="mission">Our mission is to maintain the integrity of the electoral process through advanced monitoring and reporting systems.</p>
            </div>
          </div>
          
          <div className="copyright">
            <p>© Copyright {new Date().getFullYear()} by Election Commission. All Rights Reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-section">
        <div className="login-card">
          <div className="login-header">
            <h2>Login</h2>
            <p>Access your monitoring dashboard</p>
          </div>

          {/* Role Selection */}
          <div className="role-selector">
            <label className="role-label">Select Your Role</label>
            <div className="role-buttons">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  className={`role-button ${role === r.value ? 'active' : ''}`}
                  onClick={() => setRole(r.value)}
                >
                  <span className="role-icon">{r.icon}</span>
                  <span className="role-text">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Citizen Login - Aadhaar & OTP */}
            {role === 'citizen' && (
              <>
                <div className="form-group">
                  <label htmlFor="aadhaar">Aadhaar Number *</label>
                  <input
                    type="text"
                    id="aadhaar"
                    placeholder="Enter 12-digit Aadhaar Number"
                    value={aadhaarId}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setAadhaarId(value);
                    }}
                    maxLength="12"
                    pattern="\d{12}"
                    required
                  />
                  <button
                    type="button"
                    className="send-otp-button"
                    onClick={handleSendOtp}
                    disabled={aadhaarId.length !== 12 || otpSent}
                  >
                    {otpSent ? '✓ OTP Sent' : 'Send OTP'}
                  </button>
                </div>

                {otpSent && (
                  <div className="form-group">
                    <label htmlFor="otp">Enter OTP *</label>
                    <input
                      type="text"
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtp(value);
                      }}
                      maxLength="6"
                      pattern="\d{6}"
                      required
                    />
                    <button
                      type="button"
                      className="resend-otp"
                      onClick={handleSendOtp}
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Other Roles - Email & Password */}
            {role !== 'citizen' && (
              <>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember Me</span>
                  </label>
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
              </>
            )}

            <button 
              type="submit" 
              className="login-button"
              disabled={role === 'citizen' && (!otpSent || otp.length !== 6)}
            >
              Login as {roles.find(r => r.value === role)?.label}
            </button>

            {role === 'citizen' && (
              <div className="additional-links">
                <a href="#" className="link">New Registration?</a>
                <span className="separator">|</span>
                <a href="#" className="link">Help & Support</a>
              </div>
            )}

            {role !== 'citizen' && (
              <div className="additional-links">
                <a href="#" className="link">Contact Administrator</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
