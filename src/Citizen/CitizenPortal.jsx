import { useState } from 'react';
import './CitizenPortal.css';

function CitizenPortal({ onLogout }) {
  const [activeTab, setActiveTab] = useState('elections');
  const [issueType, setIssueType] = useState('');
  const [pollingStation, setPollingStation] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [submittedReports, setSubmittedReports] = useState([
    {
      id: 1,
      type: 'Long Queue',
      status: 'In Progress',
      location: 'North Park Library',
      description: 'Extremely long wait times, estimated 2+ hours. Only 2 voting booths operational.',
      date: '2/24/2026'
    }
  ]);
  const [showVoterRegistration, setShowVoterRegistration] = useState(false);
  const [voterData, setVoterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    district: ''
  });

  const [violationType, setViolationType] = useState('');
  const [violationLocation, setViolationLocation] = useState('');
  const [violationDescription, setViolationDescription] = useState('');
  const [violationImage, setViolationImage] = useState(null);
  const [violationImagePreview, setViolationImagePreview] = useState(null);
  const [submittedComplaints, setSubmittedComplaints] = useState([]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    aadhaar: '1234 5678 9012',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    newPassword: '',
    confirmPassword: ''
  });

  const [userLocation, setUserLocation] = useState({
    country: '',
    state: '',
    district: ''
  });

  const locationData = {
    india: {
      states: ['maharashtra', 'karnataka', 'delhi', 'tamil-nadu', 'uttar-pradesh', 'rajasthan'],
      stateNames: {
        maharashtra: 'Maharashtra',
        karnataka: 'Karnataka',
        delhi: 'Delhi',
        'tamil-nadu': 'Tamil Nadu',
        'uttar-pradesh': 'Uttar Pradesh',
        rajasthan: 'Rajasthan'
      },
      districts: {
        maharashtra: ['central', 'north', 'south', 'pune', 'nashik'],
        karnataka: ['bangalore', 'belgaum', 'mysore', 'kumta', 'hassan'],
        delhi: ['north', 'central', 'south', 'east', 'west'],
        'tamil-nadu': ['chennai', 'madurai', 'salem', 'coimbatore', 'tiruppur'],
        'uttar-pradesh': ['lucknow', 'kanpur', 'varanasi', 'agra', 'meerut'],
        rajasthan: ['jaipur', 'udaipur', 'jodhpur', 'bikaner', 'ajmer']
      },
      districtNames: {
        central: 'Central District',
        north: 'North District',
        south: 'South District',
        east: 'East District',
        west: 'West District',
        pune: 'Pune District',
        nashik: 'Nashik District',
        bangalore: 'Bangalore District',
        belgaum: 'Belgaum District',
        mysore: 'Mysore District',
        kumta: 'Kumta District',
        hassan: 'Hassan District',
        chennai: 'Chennai District',
        madurai: 'Madurai District',
        salem: 'Salem District',
        coimbatore: 'Coimbatore District',
        tiruppur: 'Tiruppur District',
        lucknow: 'Lucknow District',
        kanpur: 'Kanpur District',
        varanasi: 'Varanasi District',
        agra: 'Agra District',
        meerut: 'Meerut District',
        jaipur: 'Jaipur District',
        udaipur: 'Udaipur District',
        jodhpur: 'Jodhpur District',
        bikaner: 'Bikaner District',
        ajmer: 'Ajmer District'
      }
    },
    usa: {
      states: ['california', 'texas', 'new-york', 'florida', 'pennsylvania', 'illinois'],
      stateNames: {
        california: 'California',
        texas: 'Texas',
        'new-york': 'New York',
        florida: 'Florida',
        pennsylvania: 'Pennsylvania',
        illinois: 'Illinois'
      },
      districts: {
        california: ['los-angeles', 'san-francisco', 'san-diego', 'sacramento', 'fresno'],
        texas: ['houston', 'dallas', 'austin', 'san-antonio', 'fort-worth'],
        'new-york': ['new-york-city', 'brooklyn', 'manhattan', 'bronx', 'albany'],
        florida: ['miami', 'orlando', 'tampa', 'jacksonville', 'fort-lauderdale'],
        pennsylvania: ['philadelphia', 'pittsburgh', 'allentown', 'harrisburg', 'erie'],
        illinois: ['chicago', 'cook', 'dupage', 'will', 'kane']
      },
      districtNames: {
        'los-angeles': 'Los Angeles District',
        'san-francisco': 'San Francisco District',
        'san-diego': 'San Diego District',
        sacramento: 'Sacramento District',
        fresno: 'Fresno District',
        houston: 'Houston District',
        dallas: 'Dallas District',
        austin: 'Austin District',
        'san-antonio': 'San Antonio District',
        'fort-worth': 'Fort Worth District',
        'new-york-city': 'New York City District',
        brooklyn: 'Brooklyn District',
        manhattan: 'Manhattan District',
        bronx: 'Bronx District',
        albany: 'Albany District',
        miami: 'Miami District',
        orlando: 'Orlando District',
        tampa: 'Tampa District',
        jacksonville: 'Jacksonville District',
        'fort-lauderdale': 'Fort Lauderdale District',
        philadelphia: 'Philadelphia District',
        pittsburgh: 'Pittsburgh District',
        allentown: 'Allentown District',
        harrisburg: 'Harrisburg District',
        erie: 'Erie District',
        chicago: 'Chicago District',
        cook: 'Cook District',
        dupage: 'DuPage District',
        will: 'Will District',
        kane: 'Kane District'
      }
    },
    uk: {
      states: ['england', 'scotland', 'wales', 'northern-ireland'],
      stateNames: {
        england: 'England',
        scotland: 'Scotland',
        wales: 'Wales',
        'northern-ireland': 'Northern Ireland'
      },
      districts: {
        england: ['london', 'manchester', 'birmingham', 'leeds', 'liverpool'],
        scotland: ['edinburgh', 'glasgow', 'aberdeen', 'dundee', 'stirling'],
        wales: ['cardiff', 'swansea', 'newport', 'wrexham', 'bangor'],
        'northern-ireland': ['belfast', 'derry', 'lisburn', 'newry', 'armagh']
      },
      districtNames: {
        london: 'London District',
        manchester: 'Manchester District',
        birmingham: 'Birmingham District',
        leeds: 'Leeds District',
        liverpool: 'Liverpool District',
        edinburgh: 'Edinburgh District',
        glasgow: 'Glasgow District',
        aberdeen: 'Aberdeen District',
        dundee: 'Dundee District',
        stirling: 'Stirling District',
        cardiff: 'Cardiff District',
        swansea: 'Swansea District',
        newport: 'Newport District',
        wrexham: 'Wrexham District',
        bangor: 'Bangor District',
        belfast: 'Belfast District',
        derry: 'Derry District',
        lisburn: 'Lisburn District',
        newry: 'Newry District',
        armagh: 'Armagh District'
      }
    },
    canada: {
      states: ['ontario', 'quebec', 'british-columbia', 'alberta', 'manitoba'],
      stateNames: {
        ontario: 'Ontario',
        quebec: 'Quebec',
        'british-columbia': 'British Columbia',
        alberta: 'Alberta',
        manitoba: 'Manitoba'
      },
      districts: {
        ontario: ['toronto', 'ottawa', 'mississauga', 'hamilton', 'london'],
        quebec: ['montreal', 'quebec-city', 'gatineau', 'laval', 'sherbrooke'],
        'british-columbia': ['vancouver', 'victoria', 'burnaby', 'surrey', 'richmond'],
        alberta: ['calgary', 'edmonton', 'red-deer', 'lethbridge', 'grande-prairie'],
        manitoba: ['winnipeg', 'brandon', 'thompson', 'flin-flon', 'selkirk']
      },
      districtNames: {
        toronto: 'Toronto District',
        ottawa: 'Ottawa District',
        mississauga: 'Mississauga District',
        hamilton: 'Hamilton District',
        london: 'London District',
        montreal: 'Montreal District',
        'quebec-city': 'Quebec City District',
        gatineau: 'Gatineau District',
        laval: 'Laval District',
        sherbrooke: 'Sherbrooke District',
        vancouver: 'Vancouver District',
        victoria: 'Victoria District',
        burnaby: 'Burnaby District',
        surrey: 'Surrey District',
        richmond: 'Richmond District',
        calgary: 'Calgary District',
        edmonton: 'Edmonton District',
        'red-deer': 'Red Deer District',
        lethbridge: 'Lethbridge District',
        'grande-prairie': 'Grande Prairie District',
        winnipeg: 'Winnipeg District',
        brandon: 'Brandon District',
        thompson: 'Thompson District',
        'flin-flon': 'Flin Flon District',
        selkirk: 'Selkirk District'
      }
    }
  };

  const elections = [
    {
      id: 1,
      title: '2026 Presidential Election',
      badge: 'upcoming',
      date: '11/3/2026',
      daysRemaining: 232,
      registrationDeadline: '10/15/2026',
      daysLeft: 233,
      country: 'india',
      state: 'maharashtra',
      district: 'central',
      turnout: null
    },
    {
      id: 2,
      title: 'State Governor Election - California',
      badge: 'ongoing',
      date: '6/15/2026',
      daysRemaining: 111,
      registrationDeadline: '5/30/2026',
      daysLeft: 95,
      country: 'usa',
      state: 'california',
      district: '',
      turnout: 39.0
    },
    {
      id: 3,
      title: 'Local Municipal Election',
      badge: 'upcoming',
      date: '3/15/2026',
      daysRemaining: 18,
      registrationDeadline: '3/01/2026',
      daysLeft: 4,
      country: 'india',
      state: 'karnataka',
      district: 'south',
      turnout: null
    },
    {
      id: 4,
      title: 'State Assembly Election - Texas',
      badge: 'upcoming',
      date: '9/1/2026',
      daysRemaining: 159,
      registrationDeadline: '8/15/2026',
      daysLeft: 143,
      country: 'usa',
      state: 'texas',
      district: '',
      turnout: null
    },
    {
      id: 5,
      title: 'Delhi Assembly Election',
      badge: 'ongoing',
      date: '2/28/2026',
      daysRemaining: 3,
      registrationDeadline: '2/10/2026',
      daysLeft: -15,
      country: 'india',
      state: 'delhi',
      district: 'north',
      turnout: 56.8
    }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      party: 'Indian National Congress',
      symbol: '🌾',
      age: 52,
      experience: '25 years',
      education: 'Law Degree',
      state: 'maharashtra',
      image: '👨‍💼',
      votesPercentage: 28
    },
    {
      id: 2,
      name: 'Priya Singh',
      party: 'Bharatiya Janata Party',
      symbol: '🔔',
      age: 45,
      experience: '20 years',
      education: 'MBA',
      state: 'maharashtra',
      image: '👩‍💼',
      votesPercentage: 32
    },
    {
      id: 3,
      name: 'Vikram Patel',
      party: 'Aam Aadmi Party',
      symbol: '🌟',
      age: 38,
      experience: '12 years',
      education: 'Engineering Degree',
      state: 'maharashtra',
      image: '👨‍💼',
      votesPercentage: 25
    },
    {
      id: 4,
      name: 'David Johnson',
      party: 'Democratic Party',
      symbol: '🐘',
      age: 55,
      experience: '30 years',
      education: 'Political Science PhD',
      state: 'california',
      image: '👨‍💼',
      votesPercentage: 42
    },
    {
      id: 5,
      name: 'Sarah Williams',
      party: 'Republican Party',
      symbol: '🐘',
      age: 48,
      experience: '18 years',
      education: 'Law Degree',
      state: 'california',
      image: '👩‍💼',
      votesPercentage: 38
    },
    {
      id: 6,
      name: 'Michael Brown',
      party: 'Independent',
      symbol: '⭐',
      age: 42,
      experience: '15 years',
      education: 'Business Degree',
      state: 'california',
      image: '👨‍💼',
      votesPercentage: 20
    },
    {
      id: 7,
      name: 'Anjali Sharma',
      party: 'All India Majlis-e-Ittehadul Muslimeen',
      symbol: '🕌',
      age: 41,
      experience: '16 years',
      education: 'MA in Politics',
      state: 'karnataka',
      image: '👩‍💼',
      votesPercentage: 35
    },
    {
      id: 8,
      name: 'Nikhil Gupta',
      party: 'Indian National Congress',
      symbol: '🌾',
      age: 50,
      experience: '22 years',
      education: 'Economics Degree',
      state: 'karnataka',
      image: '👨‍💼',
      votesPercentage: 30
    }
  ];

  const getAvailableElections = () => {
    if (!userLocation.country) return elections;
    
    return elections.filter(election => {
      const countryMatch = election.country === userLocation.country;
      const stateMatch = !userLocation.state || election.state === userLocation.state;
      const districtMatch = !userLocation.district || election.district === userLocation.district || election.district === '';
      
      return countryMatch && stateMatch && districtMatch;
    });
  };

  const getAvailableStates = () => {
    const country = voterData.country;
    if (!country || !locationData[country]) return [];
    return locationData[country].states;
  };

  const getAvailableDistricts = () => {
    const country = voterData.country;
    const state = voterData.state;
    if (!country || !state || !locationData[country] || !locationData[country].districts[state]) {
      return [];
    }
    return locationData[country].districts[state];
  };

  const getStateName = (stateCode) => {
    const country = voterData.country;
    if (!country || !locationData[country]) return stateCode;
    return locationData[country].stateNames[stateCode] || stateCode;
  };

  const getDistrictName = (districtCode) => {
    const country = voterData.country;
    if (!country || !locationData[country]) return districtCode;
    return locationData[country].districtNames[districtCode] || districtCode;
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    
    const newReport = {
      id: submittedReports.length + 1,
      type: issueType,
      status: 'Pending Review',
      location: pollingStation,
      description: description,
      severity: severity,
      date: new Date().toLocaleDateString()
    };

    setSubmittedReports([newReport, ...submittedReports]);
    console.log('Report submitted:', newReport);
    
    // Reset form
    setIssueType('');
    setPollingStation('');
    setSeverity('');
    setDescription('');
  };

  const handleVoterRegistration = (e) => {
    e.preventDefault();
    console.log('Voter registered:', voterData);
    
    // Set user location based on registration
    setUserLocation({
      country: voterData.country,
      state: voterData.state,
      district: voterData.district
    });
    
    setVoterData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      state: '',
      district: ''
    });
    setShowVoterRegistration(false);
  };

  const handleSwitchRole = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const handleUpdatePhone = () => {
    if (profileData.phone.trim() === '') {
      alert('Please enter a phone number');
      return;
    }
    console.log('Phone updated:', profileData.phone);
    setShowProfileModal(false);
  };

  const handleChangePassword = () => {
    if (profileData.newPassword === '' || profileData.confirmPassword === '') {
      alert('Please fill in all password fields');
      return;
    }
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (profileData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    console.log('Password changed successfully');
    setProfileData({
      ...profileData,
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password changed successfully');
  };

  const handleDeleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setSubmittedReports(submittedReports.filter(report => report.id !== id));
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'In Progress') return 'in-progress';
    if (status === 'Pending Review') return 'pending';
    if (status === 'Resolved') return 'resolved';
    return 'pending';
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setViolationImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setViolationImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    
    const newComplaint = {
      id: submittedReports.length + 1,
      type: violationType,
      status: 'Reported',
      location: violationLocation,
      description: violationDescription,
      severity: 'high',
      image: violationImagePreview,
      date: new Date().toLocaleDateString()
    };

    setSubmittedReports([newComplaint, ...submittedReports]);
    console.log('Complaint submitted:', newComplaint);
    
    // Reset form
    setViolationType('');
    setViolationLocation('');
    setViolationDescription('');
    setViolationImage(null);
    setViolationImagePreview(null);
  };

  const handleDeleteComplaint = (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      setSubmittedComplaints(submittedComplaints.filter(complaint => complaint.id !== id));
    }
  };

  return (
    <div className="citizen-portal">
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
            <p className="header-subtitle">Ensuring transparency and integrity</p>
          </div>
        </div>
        <div className="header-right">
          <button className="profile-btn" onClick={() => setShowProfileModal(true)} title="View Profile">
            👤 Profile
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="portal-main">
        <div className="portal-container">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-title-section">
              <h2 className="page-title">Citizen Portal</h2>
              <p className="page-description">Track elections, report issues, and engage with your community</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card clickable" onClick={() => setActiveTab('elections')}>
              <div className="stat-content">
                <h3 className="stat-label">Upcoming Elections</h3>
              </div>
              <div className="stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M 8 3 L 8 9 M 16 3 L 16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card clickable" onClick={() => setActiveTab('myReports')}>
              <div className="stat-content">
                <h3 className="stat-label">My Reports</h3>
              </div>
              <div className="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 9 11 L 12 14 L 22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M 21 12 v 7 a 2 2 0 0 1 -2 2 H 5 a 2 2 0 0 1 -2 -2 V 5 a 2 2 0 0 1 2 -2 h 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card clickable" onClick={() => setActiveTab('pollingStations')}>
              <div className="stat-content">
                <h3 className="stat-label">Polling Stations</h3>
              </div>
              <div className="stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M 12 2 L 12 22 M 5 5 h 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M 12 12 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="portal-tabs">
            <button 
              className={`tab-btn ${activeTab === 'elections' ? 'active' : ''}`}
              onClick={() => setActiveTab('elections')}
            >
              Elections
            </button>
            <button 
              className={`tab-btn ${activeTab === 'myReports' ? 'active' : ''}`}
              onClick={() => setActiveTab('myReports')}
            >
              My Reports
            </button>
            <button 
              className={`tab-btn ${activeTab === 'pollingStations' ? 'active' : ''}`}
              onClick={() => setActiveTab('pollingStations')}
            >
              Polling Stations
            </button>
            <button 
              className={`tab-btn ${activeTab === 'candidates' ? 'active' : ''}`}
              onClick={() => setActiveTab('candidates')}
            >
              Candidates
            </button>
            <button 
              className={`tab-btn ${activeTab === 'complaints' ? 'active' : ''}`}
              onClick={() => setActiveTab('complaints')}
            >
              Report Violation
            </button>
            <button 
              className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'elections' && (
              <div className="elections-section">
                <div className="section-header">
                  <div>
                    <h3 className="section-title">Available Elections</h3>
                    <p className="section-subtitle">
                      {userLocation.country ? `Elections for ${userLocation.state || userLocation.country}` : 'Register to see elections for your location'}
                    </p>
                  </div>
                </div>

                {getAvailableElections().length === 0 ? (
                  <div className="no-elections-message">
                    <p>No elections found for your location.</p>
                    <p>Please register to vote to see available elections in your area.</p>
                  </div>
                ) : (
                  <div className="elections-list">
                    {getAvailableElections().map((election) => (
                      <div key={election.id} className="election-card">
                        <div className="election-header">
                          <div className="election-info">
                            <h4 className="election-title">{election.title}</h4>
                            <span className={`election-badge ${election.badge}`}>{election.badge}</span>
                          </div>
                          <button className="election-action-btn primary" onClick={() => setShowVoterRegistration(true)}>Register to Vote</button>
                        </div>
                        <div className="election-details">
                          <div className="detail-item">
                            <span className="detail-icon">📅</span>
                            <div>
                              <p className="detail-label">Election Date</p>
                              <p className="detail-value">{election.date}</p>
                              <p className="detail-note blue">{election.daysRemaining} days remaining</p>
                            </div>
                          </div>
                          <div className="detail-item">
                            <span className="detail-icon">⏰</span>
                            <div>
                              <p className="detail-label">Registration Deadline</p>
                              <p className="detail-value">{election.registrationDeadline}</p>
                              <p className="detail-note red">{election.daysLeft} days left</p>
                            </div>
                          </div>
                        </div>
                        {election.turnout && (
                          <div className="turnout-section">
                            <div className="turnout-header">
                              <span className="turnout-label">Current Turnout</span>
                              <span className="turnout-percentage">{election.turnout}%</span>
                            </div>
                            <div className="progress-bar">
                              <div className="progress-fill" style={{ width: `${election.turnout}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Modal */}
            {showProfileModal && (
              <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
                <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>My Profile</h3>
                    <button className="modal-close" onClick={() => setShowProfileModal(false)}>×</button>
                  </div>
                  
                  <div className="profile-tabs">
                    <button className="profile-tab-btn tabs-active">View Details</button>
                    <button className="profile-tab-btn">Update Phone</button>
                    <button className="profile-tab-btn">Change Password</button>
                  </div>

                  <div className="profile-content">
                    {/* View Details Tab */}
                    <div className="profile-section">
                      <div className="profile-header">
                        <div className="profile-avatar">👤</div>
                        <div className="profile-basic">
                          <h4>{profileData.name}</h4>
                          <p>{profileData.email}</p>
                        </div>
                      </div>
                      
                      <div className="profile-details">
                        <div className="detail-row">
                          <span className="detail-label">Name:</span>
                          <span className="detail-value">{profileData.name}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Email:</span>
                          <span className="detail-value">{profileData.email}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Phone:</span>
                          <span className="detail-value">{profileData.phone}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Aadhaar:</span>
                          <span className="detail-value">{profileData.aadhaar} <small>(Cannot be changed)</small></span>
                        </div>
                      </div>
                    </div>

                    {/* Update Phone Tab */}
                    <div className="profile-section hidden">
                      <h4 className="section-title">Update Phone Number</h4>
                      <div className="form-field">
                        <label>Current Phone</label>
                        <input type="text" value={profileData.phone} disabled className="disabled-input" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="newPhone">New Phone Number *</label>
                        <input
                          type="tel"
                          id="newPhone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          placeholder="Enter new phone number"
                        />
                      </div>
                      <button className="submit-btn" onClick={handleUpdatePhone}>Update Phone</button>
                    </div>

                    {/* Change Password Tab */}
                    <div className="profile-section hidden">
                      <h4 className="section-title">Change Password</h4>
                      <div className="form-field">
                        <label htmlFor="newPassword">New Password *</label>
                        <input
                          type="password"
                          id="newPassword"
                          value={profileData.newPassword}
                          onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                          placeholder="Enter new password (min 6 characters)"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={profileData.confirmPassword}
                          onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                          placeholder="Confirm your password"
                        />
                      </div>
                      <button className="submit-btn" onClick={handleChangePassword}>Change Password</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Voter Registration Modal */}
            {showVoterRegistration && (
              <div className="modal-overlay" onClick={() => setShowVoterRegistration(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Voter Registration</h3>
                    <button className="modal-close" onClick={() => setShowVoterRegistration(false)}>×</button>
                  </div>
                  
                  <form onSubmit={handleVoterRegistration} className="voter-form">
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="firstName">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          value={voterData.firstName}
                          onChange={(e) => setVoterData({ ...voterData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="lastName">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          value={voterData.lastName}
                          onChange={(e) => setVoterData({ ...voterData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          id="email"
                          value={voterData.email}
                          onChange={(e) => setVoterData({ ...voterData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="phone">Phone *</label>
                        <input
                          type="tel"
                          id="phone"
                          value={voterData.phone}
                          onChange={(e) => setVoterData({ ...voterData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field full-width">
                      <label htmlFor="address">Address *</label>
                      <input
                        type="text"
                        id="address"
                        value={voterData.address}
                        onChange={(e) => setVoterData({ ...voterData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="country">Country *</label>
                        <select
                          id="country"
                          value={voterData.country}
                          onChange={(e) => setVoterData({ ...voterData, country: e.target.value, state: '', district: '' })}
                          required
                        >
                          <option value="">Select your country</option>
                          <option value="india">India</option>
                          <option value="usa">USA</option>
                          <option value="uk">United Kingdom</option>
                          <option value="canada">Canada</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="state">State *</label>
                        <select
                          id="state"
                          value={voterData.state}
                          onChange={(e) => setVoterData({ ...voterData, state: e.target.value, district: '' })}
                          required
                          disabled={!voterData.country}
                        >
                          <option value="">Select your state</option>
                          {voterData.country && getAvailableStates().map((state) => (
                            <option key={state} value={state}>
                              {locationData[voterData.country].stateNames[state] || state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-field full-width">
                      <label htmlFor="district">District *</label>
                      <select
                        id="district"
                        value={voterData.district}
                        onChange={(e) => setVoterData({ ...voterData, district: e.target.value })}
                        required
                        disabled={!voterData.state}
                      >
                        <option value="">Select your district</option>
                        {voterData.state && getAvailableDistricts().map((district) => (
                          <option key={district} value={district}>
                            {locationData[voterData.country].districtNames[district] || district}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="modal-actions">
                      <button type="button" className="cancel-btn" onClick={() => setShowVoterRegistration(false)}>Cancel</button>
                      <button type="submit" className="submit-btn">Register to Vote</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'myReports' && (
              <div className="my-reports-section">
                <div className="section-header">
                  <div>
                    <h3 className="section-title">My Reports</h3>
                    <p className="section-subtitle">Track the status of your submitted reports</p>
                  </div>
                </div>

                <div className="reports-list">
                  {submittedReports.length > 0 ? (
                    submittedReports.map((report) => (
                      <div key={report.id} className="report-item">
                        <div className="report-header">
                          <div className="report-badges">
                            <span className="report-type-badge">{report.type}</span>
                            <span className={`report-status-badge ${getStatusBadgeClass(report.status)}`}>{report.status}</span>
                          </div>
                          <div className="report-actions">
                            <span className="report-date">{report.date}</span>
                            <button className="delete-report-btn" onClick={() => handleDeleteReport(report.id)} title="Delete report">🗑️</button>
                          </div>
                        </div>
                        <h4 className="report-location">{report.location}</h4>
                        <p className="report-description">{report.description}</p>
                        {report.severity && <p className="report-severity"><strong>Severity:</strong> {report.severity}</p>}
                        {report.image && (
                          <div className="report-image-container">
                            <img src={report.image} alt="Report evidence" className="report-image" />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-reports">
                      <p>No reports submitted yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'pollingStations' && (
              <div className="polling-stations-section">
                <div className="section-header">
                  <div className="section-icon">📍</div>
                  <div>
                    <h3 className="section-title">Find Your Polling Station</h3>
                    <p className="section-subtitle">Locate nearby polling stations and check their status</p>
                  </div>
                </div>

                <div className="stations-list">
                  <div className="station-card">
                    <div className="station-header">
                      <div>
                        <h4 className="station-name">Central Community Center</h4>
                        <span className="station-status operational">operational</span>
                      </div>
                      <button className="directions-btn">Get Directions</button>
                    </div>
                    <p className="station-address">123 Main Street, City Center</p>
                    <p className="station-district">District: <strong>Downtown District</strong></p>
                    <p className="station-queue">Queue: <strong>15 people</strong></p>
                  </div>

                  <div className="station-card">
                    <div className="station-header">
                      <div>
                        <h4 className="station-name">Westside High School</h4>
                        <span className="station-status operational">operational</span>
                      </div>
                      <button className="directions-btn">Get Directions</button>
                    </div>
                    <p className="station-address">456 Oak Avenue, Westside</p>
                    <p className="station-district">District: <strong>West District</strong></p>
                    <p className="station-queue">Queue: <strong>8 people</strong></p>
                  </div>

                  <div className="station-card">
                    <div className="station-header">
                      <div>
                        <h4 className="station-name">North Park Library</h4>
                        <span className="station-status delayed">delayed</span>
                      </div>
                      <button className="directions-btn">Get Directions</button>
                    </div>
                    <p className="station-address">789 Elm Street, North Park</p>
                    <p className="station-district">District: <strong>North District</strong></p>
                    <p className="station-queue">Queue: <strong>32 people</strong></p>
                  </div>

                  <div className="station-card">
                    <div className="station-header">
                      <div>
                        <h4 className="station-name">South Bay Recreation Center</h4>
                        <span className="station-status operational">operational</span>
                      </div>
                      <button className="directions-btn">Get Directions</button>
                    </div>
                    <p className="station-address">321 Beach Road, South Bay</p>
                    <p className="station-district">District: <strong>South District</strong></p>
                    <p className="station-queue">Queue: <strong>5 people</strong></p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'complaints' && (
              <div className="complaints-section">
                <div className="section-header">
                  <div className="section-icon">📋</div>
                  <div>
                    <h3 className="section-title">Report Election Violation</h3>
                    <p className="section-subtitle">Report any election violations or irregularities you witness</p>
                  </div>
                </div>

                <form onSubmit={handleSubmitComplaint} className="complaint-form">
                  <div className="form-field">
                    <label htmlFor="violationType">Type of Violation *</label>
                    <select
                      id="violationType"
                      value={violationType}
                      onChange={(e) => setViolationType(e.target.value)}
                      required
                    >
                      <option value="">Select violation type</option>
                      <option value="booth-irregularity">Booth Irregularity</option>
                      <option value="voter-coercion">Voter Coercion</option>
                      <option value="machine-tampering">EVM Tampering</option>
                      <option value="document-fraud">Document Fraud</option>
                      <option value="staff-bias">Staff Bias</option>
                      <option value="election-violence">Election Violence</option>
                      <option value="illegal-polling">Illegal Polling Activities</option>
                      <option value="other">Other Violation</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="violationLocation">Location *</label>
                    <input
                      type="text"
                      id="violationLocation"
                      value={violationLocation}
                      onChange={(e) => setViolationLocation(e.target.value)}
                      placeholder="Enter polling station or location name"
                      required
                    />
                  </div>

                  <div className="form-field full-width">
                    <label htmlFor="violationDescription">Description *</label>
                    <textarea
                      id="violationDescription"
                      value={violationDescription}
                      onChange={(e) => setViolationDescription(e.target.value)}
                      placeholder="Provide detailed description of the violation..."
                      rows="5"
                      required
                    />
                  </div>

                  <div className="form-field full-width">
                    <label htmlFor="violationImage">Upload Image (Optional)</label>
                    <div className="image-upload-container">
                      <input
                        type="file"
                        id="violationImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="image-input"
                      />
                      <label htmlFor="violationImage" className="image-upload-label">
                        📸 Click to upload image
                      </label>
                    </div>
                    {violationImagePreview && (
                      <div className="image-preview">
                        <img src={violationImagePreview} alt="Preview" />
                        <button type="button" className="remove-image-btn" onClick={() => {
                          setViolationImage(null);
                          setViolationImagePreview(null);
                        }}>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="submit-btn">Submit Complaint</button>
                </form>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="content-placeholder">
                <h3>Resources</h3>
                <p>Helpful resources and guides will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CitizenPortal;
