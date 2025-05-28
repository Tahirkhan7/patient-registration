"use client";
import { PGlite } from "@electric-sql/pglite";

// Define the Patient type
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory?: string;
  registrationDate: string;
}

let db: PGlite | null = null;

export async function getDb(): Promise<PGlite> {
  if (!db) {
    db = new PGlite("idb://patients");
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id TEXT PRIMARY KEY,
        firstName TEXT,
        lastName TEXT,
        dateOfBirth TEXT,
        gender TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        medicalHistory TEXT,
        registrationDate TEXT
      );
    `);
  }
  return db;
}

export async function initializeDb() {
  await getDb();
}

export async function addPatient(patient: Patient): Promise<void> {
  const db = await getDb();

  await db.exec(`
    INSERT INTO patients (
      id, firstName, lastName, dateOfBirth, gender, email, phone, address, medicalHistory, registrationDate
    ) VALUES (
      '${patient.id}',
      '${patient.firstName}',
      '${patient.lastName}',
      '${patient.dateOfBirth}',
      '${patient.gender}',
      '${patient.email}',
      '${patient.phone}',
      '${patient.address}',
      '${patient.medicalHistory ?? ""}',
      '${patient.registrationDate}'
    );
  `);
}

export async function getAllPatients(): Promise<Patient[]> {
  const db = await getDb();
  const results = await db.exec("SELECT * FROM patients;");
  const rows = results.flatMap((r) => r.rows ?? []);

  return rows.map((row: any) => ({
    id: row.id,
    firstName: row.firstname,
    lastName: row.lastname,
    dateOfBirth: row.dateofbirth,
    gender: row.gender,
    email: row.email,
    phone: row.phone,
    address: row.address,
    medicalHistory: row.medicalhistory,
    registrationDate: row.registrationdate,
  }));
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export async function executeQuery(
  sql: string
): Promise<{ data: any[]; columns: string[] }> {
  const db = await getDb();

  const normalizedSql = sql.trim().toLowerCase();
  if (!normalizedSql.startsWith("select")) {
    throw new Error("Only SELECT queries are supported.");
  }

  const results = await db.exec(sql);

  const allRows = results.flatMap((r) => r.rows ?? []);
  const data = allRows.map((row) => {
    const newRow: Record<string, any> = {};
    for (const key in row) {
      newRow[toCamelCase(key)] = row[key];
    }
    return newRow;
  });

  const columns =
    results[0]?.fields?.map((field) => toCamelCase(field.name)) ?? [];

  return {
    data,
    columns,
  };
}
