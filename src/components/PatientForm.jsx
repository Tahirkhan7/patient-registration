import { useState } from 'react';
import { getDb, notifyUpdate } from '../service/pglite';

export default function PatientForm({ onRegister }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDb();
    await db.run(
      `INSERT INTO patients (name, age, gender, contact, created_at) VALUES (?, ?, ?, ?, datetime('now'))`,
      [form.name, form.age, form.gender, form.contact]
    );
    setForm({ name: '', age: '', gender: '', contact: '' });
    notifyUpdate();
    onRegister(); // Refresh patient list
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Patient</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
      <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} required />
      <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
