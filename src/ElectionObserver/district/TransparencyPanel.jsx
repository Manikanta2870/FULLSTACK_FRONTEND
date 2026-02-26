function TransparencyPanel({ complaints, incidents, notes, alerts }) {
  return (
    <div className="transparency-panel">
      <div className="panel-card">
        <h4>Complaints</h4>
        <div className="panel-content">
          {complaints.length > 0 ? complaints.map((c, i) => <p key={i}>• {c}</p>) : <p className="empty">No active complaints</p>}
        </div>
      </div>

      <div className="panel-card">
        <h4>Incident Reports</h4>
        <div className="panel-content">
          {incidents.length > 0 ? incidents.map((c, i) => <p key={i}>• {c}</p>) : <p className="empty">No incidents reported</p>}
        </div>
      </div>

      <div className="panel-card">
        <h4>Observer Notes</h4>
        <div className="panel-content">
          {notes.length > 0 ? notes.map((c, i) => <p key={i}>• {c}</p>) : <p className="empty">No notes</p>}
        </div>
      </div>

      <div className="panel-card">
        <h4>Alerts</h4>
        <div className="panel-content">
          {alerts.length > 0 ? alerts.map((c, i) => <p key={i}>⚠ {c}</p>) : <p className="empty">No active alerts</p>}
        </div>
      </div>
    </div>
  );
}

export default TransparencyPanel;
