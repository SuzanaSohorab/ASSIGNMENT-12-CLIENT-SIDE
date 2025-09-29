// src/pages/AdminDashboard/Reports.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/reports")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reported Activities</h1>
      {reports.length === 0 ? <p>No reports yet</p> : (
        <ul className="space-y-3">
          {reports.map(r => (
            <li key={r._id} className="p-3 border rounded">
              <p><b>Reporter:</b> {r.reporterEmail}</p>
              <p><b>Reason:</b> {r.reason}</p>
              <p><b>Target:</b> {r.targetId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
