import { useState } from 'react';
import { getDb } from '../service/pglite';

export default function SQLConsole() {
  const [sql, setSql] = useState('');
  const [result, setResult] = useState([]);

  const runQuery = async () => {
    try {
      const db = getDb();
      const rows = await db.all(sql);
      setResult(rows);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Run SQL Query</h2>
      <textarea rows="4" value={sql} onChange={(e) => setSql(e.target.value)} placeholder="SELECT * FROM patients;" />
      <button onClick={runQuery}>Execute</button>
      {result.length > 0 && (
        <table border="1">
          <thead>
            <tr>{Object.keys(result[0]).map((key) => <th key={key}>{key}</th>)}</tr>
          </thead>
          <tbody>
            {result.map((row, i) => (
              <tr key={i}>{Object.values(row).map((val, j) => <td key={j}>{val}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
