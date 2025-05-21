import { useEffect, useState } from 'react';
import { initDb, getDb, syncAcrossTabs } from './service/pglite';
import PatientForm from './components/PatientForm';
import SQLConsole from './components/SQLConsole';

export default function App() {
  const [patients, setPatients] = useState([]);

  const loadPatients = async () => {
    const db = getDb();
    const rows = await db.all('SELECT * FROM patients ORDER BY created_at DESC');
    setPatients(rows);
  };

  useEffect(() => {
    initDb().then(loadPatients);
    syncAcrossTabs(loadPatients);
  }, []);

  return (
    <div>
      <h1>Patient Registration App</h1>
      <PatientForm onRegister={loadPatients} />
      <h2>Registered Patients</h2>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>{p.name} - {p.age} - {p.gender} - {p.contact}</li>
        ))}
      </ul>
      <SQLConsole />
    </div>
  );
}
