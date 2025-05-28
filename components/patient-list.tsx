"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { getAllPatients, type Patient } from "@/lib/db"

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPatients = async () => {
      setIsLoading(true)
      const data = await getAllPatients()
      setPatients(data)
      setIsLoading(false)
    }

    loadPatients()

    // Listen for database changes from other tabs
    const handleStorageChange = () => {
      loadPatients()
    }

    window.addEventListener("storage-changed", handleStorageChange)

    return () => {
      window.removeEventListener("storage-changed", handleStorageChange)
    }
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      patient.firstName.toLowerCase().includes(searchLower) ||
      patient.lastName.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.phone.includes(searchTerm)
    )
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient List</CardTitle>
        <CardDescription>View and search registered patients</CardDescription>
        <Input
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4">Loading patients...</p>
        ) : patients.length === 0 ? (
          <p className="text-center py-4">No patients registered yet.</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{`${patient.firstName} ${patient.lastName}`}</TableCell>
                    <TableCell>{patient.dateOfBirth}</TableCell>
                    <TableCell className="capitalize">{patient.gender}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
