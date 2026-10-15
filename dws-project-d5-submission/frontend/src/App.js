import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/overview')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading ROSCA Dashboard...</div>;
  if (!data) return <div className="error">Failed to load dashboard data.</div>;

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>ROSCA Financial Dashboard</h1>
        <span className="badge">Track A - Deliverable 5</span>
      </header>

      <div className="grid-container">
        {/* 1. Circle Overview */}
        <div className="card circle-overview">
          <h2>Circle Overview</h2>
          <div className="card-body">
            <p><strong>Name:</strong> {data.circle.name}</p>
            <p><strong>Contribution Amount:</strong> ${data.circle.contribution_amount}</p>
            <p><strong>Frequency:</strong> {data.circle.cycle_frequency}</p>
            <p><strong>Capacity:</strong> {data.circle.max_members} Members</p>
            <p><strong>Active Cycle:</strong> #{data.circle.current_cycle}</p>
          </div>
        </div>

        {/* 2. Next-Payout Indicator */}
        <div className="card payout-indicator">
          <h2>Next-Payout Indicator</h2>
          <div className="card-body highlight">
            <p className="pot-amount">${data.next_payout.total_pot}</p>
            <p><strong>Recipient:</strong> {data.next_payout.recipient_name}</p>
            <p><strong>Cycle:</strong> #{data.next_payout.cycle_number}</p>
            <p><strong>Scheduled Date:</strong> {data.next_payout.disbursement_date}</p>
          </div>
        </div>

        {/* 3. Contribution Status Table */}
        <div className="card contribution-status full-width">
          <h2>Current Cycle Contribution Status</h2>
          <table>
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Member Name</th>
                <th>Amount Paid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.contributions.map((c) => (
                <tr key={c.member_id}>
                  <td>#{c.member_id}</td>
                  <td>{c.full_name}</td>
                  <td>${c.amount}</td>
                  <td>
                    <span className={`status-tag ${c.status}`}>
                      {c.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
