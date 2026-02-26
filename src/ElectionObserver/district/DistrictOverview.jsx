function DistrictOverview({ district, lastUpdated }) {
  return (
    <div className="district-overview">
      <div className="overview-header">
        <div>
          <h2>{district.name}</h2>
          <p className="overview-subtitle">{district.state} • {district.phase}</p>
        </div>
        <div className={`district-status ${district.status}`}>{district.status.toUpperCase()}</div>
      </div>
      <div className="overview-grid">
        <div className="overview-item">
          <span className="overview-label">Observer</span>
          <span className="overview-value">{district.observer}</span>
        </div>
        <div className="overview-item">
          <span className="overview-label">Polling Stations</span>
          <span className="overview-value">{district.pollingStations.length}</span>
        </div>
        <div className="overview-item">
          <span className="overview-label">Registered Voters</span>
          <span className="overview-value">{district.registeredVoters.toLocaleString()}</span>
        </div>
        <div className="overview-item">
          <span className="overview-label">Last Updated</span>
          <span className="overview-value">{lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}

export default DistrictOverview;
