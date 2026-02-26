function StationTable({ stations, selectedStationId }) {
  return (
    <div className="station-table">
      <h3>Polling Stations</h3>
      <table>
        <thead>
          <tr>
            <th>Station Name</th>
            <th>Booth#</th>
            <th>Voters</th>
            <th>Votes Cast</th>
            <th>Turnout %</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stations.map(station => {
            const turnout = station.registeredVoters > 0 ? Math.round((station.votesCast / station.registeredVoters) * 100) : 0;
            let statusColor = turnout >= 70 ? 'high' : turnout >= 40 ? 'medium' : 'low';
            return (
              <tr key={station.id} className={selectedStationId === station.id ? 'selected' : ''}>
                <td>{station.name}</td>
                <td>{station.boothNo}</td>
                <td>{station.registeredVoters}</td>
                <td>{station.votesCast}</td>
                <td>{turnout}%</td>
                <td><span className={`status-badge ${statusColor}`}></span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StationTable;
