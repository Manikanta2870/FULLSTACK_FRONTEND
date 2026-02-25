import { useState } from 'react';
import './Dashboard.css';

function Dashboard({ onLogin }) {
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
    
    // Validate login credentials
    if (role === 'citizen') {
      // Demo validation for citizen
      if (aadhaarId === '123456789012' && otp === '123456') {
        console.log('Citizen login successful');
        onLogin(role);
      } else {
        alert('Invalid Aadhaar or OTP. Please use demo credentials.');
      }
    } else {
      // Demo validation for other roles
      const validCredentials = {
        admin: { email: 'admin@election.gov', password: 'Admin@123' },
        dataanalysts: { email: 'analyst@election.gov', password: 'Analyst@123' },
        electionobserver: { email: 'observer@election.gov', password: 'Observer@123' }
      };

      if (validCredentials[role] && 
          email === validCredentials[role].email && 
          password === validCredentials[role].password) {
        console.log(`${role} login successful`);
        onLogin(role);
      } else {
        alert('Invalid email or password. Please use demo credentials.');
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Left Side - Election Commission Info */}
      <div className="info-section">
        <div className="info-content">
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

          {/* Demo Credentials Info */}
          <div className="demo-credentials">
            <div className="demo-header">
              <span className="demo-icon">🔑</span>
              <span className="demo-title">Demo Credentials</span>
            </div>
            <div className="demo-content">
              {role === 'citizen' && (
                <div className="credential-info">
                  <p><strong>Aadhaar:</strong> 123456789012</p>
                  <p><strong>OTP:</strong> 123456</p>
                </div>
              )}
              {role === 'admin' && (
                <div className="credential-info">
                  <p><strong>Email:</strong> admin@election.gov</p>
                  <p><strong>Password:</strong> Admin@123</p>
                </div>
              )}
              {role === 'dataanalysts' && (
                <div className="credential-info">
                  <p><strong>Email:</strong> analyst@election.gov</p>
                  <p><strong>Password:</strong> Analyst@123</p>
                </div>
              )}
              {role === 'electionobserver' && (
                <div className="credential-info">
                  <p><strong>Email:</strong> observer@election.gov</p>
                  <p><strong>Password:</strong> Observer@123</p>
                </div>
              )}
            </div>
          </div>

          {/* Role Selection */}
          <div className="role-selector">
            <label className="role-label" htmlFor="role-select">Select Your Role</label>
            <select 
              id="role-select"
              className="role-dropdown"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.icon} {r.label}
                </option>
              ))}
            </select>
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
