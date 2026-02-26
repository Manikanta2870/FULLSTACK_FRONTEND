function StatisticsCards({ stats }) {
  return (
    <div className="statistics-cards">
      <div className="stat-card">
        <div className="stat-icon total">📊</div>
        <div className="stat-content">
          <div className="stat-value">{stats.totalRegistered.toLocaleString()}</div>
          <div className="stat-label">Registered Voters</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon votes">✓</div>
        <div className="stat-content">
          <div className="stat-value">{stats.totalVotesCast.toLocaleString()}</div>
          <div className="stat-label">Votes Cast</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon pending">⊘</div>
        <div className="stat-content">
          <div className="stat-value">{stats.totalNotVoted.toLocaleString()}</div>
          <div className="stat-label">Not Voted</div>
        </div>
      </div>
      <div className="stat-card progress">
        <div className="stat-content">
          <div className="stat-value">{stats.turnoutPercentage}%</div>
          <div className="stat-label">Turnout</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${stats.turnoutPercentage}%`}}></div>
          </div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon male">♂</div>
        <div className="stat-content">
          <div className="stat-value">{stats.maleVoters.toLocaleString()}</div>
          <div className="stat-label">Male Voters</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon female">♀</div>
        <div className="stat-content">
          <div className="stat-value">{stats.femaleVoters.toLocaleString()}</div>
          <div className="stat-label">Female Voters</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon other">∞</div>
        <div className="stat-content">
          <div className="stat-value">{stats.otherVoters.toLocaleString()}</div>
          <div className="stat-label">Other</div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCards;
