import { useState } from "react";
import {
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { getDb, broadcastUpdate } from "../service/pglite";

export default function PatientForm({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDb();
    await db.run(
      `INSERT INTO patients (name, age, gender, contact, created_at) VALUES (?, ?, ?, ?, datetime('now'))`,
      [form.name, form.age, form.gender, form.contact]
    );
    broadcastUpdate();
    onRegister();
    setForm({ name: "", age: "", gender: "", contact: "" });
  };

  return (
    <Box maw={400} mx="auto" mt="md" component="form" onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />
      <NumberInput
        label="Age"
        value={form.age}
        onChange={(val) => handleChange("age", val)}
        required
        mt="sm"
      />
      <Select
        label="Gender"
        data={["Male", "Female", "Other"]}
        value={form.gender}
        onChange={(val) => handleChange("gender", val)}
        required
        mt="sm"
      />
      <TextInput
        label="Contact"
        value={form.contact}
        onChange={(e) => handleChange("contact", e.target.value)}
        required
        mt="sm"
      />
      <Group position="right" mt="md">
        <Button type="submit">Register</Button>
      </Group>
    </Box>
  );
}
