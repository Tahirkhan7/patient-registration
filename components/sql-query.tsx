"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { executeQuery } from "@/lib/db";

export function SqlQuery() {
  const [query, setQuery] = useState("SELECT * FROM patients LIMIT 10;");
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);

  const handleExecuteQuery = async () => {
    setIsExecuting(true);
    setError(null);

    try {
      const { data, columns } = await executeQuery(query);
      setResults(data);
      setColumns(columns);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setResults(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const exampleQueries = [
    "SELECT * FROM patients LIMIT 10;",
    "SELECT firstName, lastName, email FROM patients WHERE gender = 'female';",
    "SELECT COUNT(*) as count FROM patients;",
    "SELECT gender, COUNT(*) as count FROM patients GROUP BY gender;",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>SQL Query</CardTitle>
        <CardDescription>Query patient records using SQL</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter SQL query..."
            className="font-mono min-h-[120px]"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {exampleQueries.map((exampleQuery, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(exampleQuery)}
                >
                  Example {index + 1}
                </Button>
              ))}
            </div>
            <Button onClick={handleExecuteQuery} disabled={isExecuting}>
              {isExecuting ? "Executing..." : "Execute Query"}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && results.length > 0 && (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex}>
                        {typeof row[column] === "object"
                          ? JSON.stringify(row[column])
                          : String(row[column] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {results && results.length === 0 && (
          <p className="text-center py-4">No results found.</p>
        )}
      </CardContent>
    </Card>
  );
}
