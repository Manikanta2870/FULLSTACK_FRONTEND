import React, { useState } from 'react';

function SearchBar({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  states,
  selectedState,
  onStateChange,
  districts,
  selectedDistrictId,
  onDistrictChange
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="search-card">
      <div className="search-header">
        <h2>Search & Filter</h2>
        <span className="live-badge">LIVE</span>
      </div>
      <div className="search-input">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search districts or polling stations..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((s) => (
              <div
                key={s.id}
                className={`suggestion-item ${s.type}`}
                onClick={() => {
                  onSelectSuggestion(s);
                  setShowSuggestions(false);
                }}
              >
                <span>{s.label}</span>
                <span className="type-badge">{s.type === 'district' ? 'District' : 'Station'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
        <select className="state-dropdown" value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
          {states.map(state => <option key={state} value={state}>{state}</option>)}
        </select>
        <select className="district-dropdown" value={selectedDistrictId} onChange={(e) => onDistrictChange(e.target.value)}>
          {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
