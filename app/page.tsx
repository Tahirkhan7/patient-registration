"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientRegistration } from "@/components/patient-registration";
import { getDb } from "@/lib/db";
import { PatientList } from "@/components/patient-list";
import { SqlQuery } from "@/components/sql-query";

export default function Home() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const setupDb = async () => {
      await getDb();
      setIsDbReady(true);
    };

    setupDb();
  }, []);

  if (!isDbReady) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Initializing database...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="mb-8 text-3xl font-bold">Patient Management System</h1>

      <Tabs defaultValue="register" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="register">Register Patient</TabsTrigger>
          <TabsTrigger value="list">Patient List</TabsTrigger>
          <TabsTrigger value="query">SQL Query</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <PatientRegistration />
        </TabsContent>

        <TabsContent value="list">
          <PatientList />
        </TabsContent>

        <TabsContent value="query">
          <SqlQuery />
        </TabsContent>
      </Tabs>
    </main>
  );
}
