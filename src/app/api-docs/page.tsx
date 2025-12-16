"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">API Reference</Badge>
          <h1 className="text-4xl font-bold">API Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Complete REST API reference for RecordHub developers.
          </p>
        </div>

        {/* Base URL */}
        <Card>
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="bg-muted text-foreground px-4 py-2 rounded-lg block">
              https://your-domain.com/api
            </code>
          </CardContent>
        </Card>

        {/* Authentication */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Authentication</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">POST</Badge>
                <code className="text-lg">/auth/register</code>
              </div>
              <CardDescription>Register a new user account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response (201)</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "clx123...",
  "name": "John Doe",
  "email": "john@example.com"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">POST</Badge>
                <code className="text-lg">/auth/forgot-password</code>
              </div>
              <CardDescription>Request a password reset email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "email": "john@example.com"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response (200)</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "message": "If an account exists, a password reset email has been sent"
}`}
                </pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Note: Always returns success to prevent email enumeration attacks. Reset link expires in 1 hour.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">POST</Badge>
                <code className="text-lg">/auth/reset-password</code>
              </div>
              <CardDescription>Reset password using token from email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "token": "abc123...",
  "password": "newSecurePassword123"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response (200)</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "message": "Password reset successfully"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Error Responses</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Code</th>
                      <th className="text-left py-2">Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2"><code>400</code></td>
                      <td>Token and password are required</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><code>400</code></td>
                      <td>Password must be at least 8 characters</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><code>400</code></td>
                      <td>Invalid or expired reset link</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code>400</code></td>
                      <td>Reset link has expired. Please request a new one.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Records API */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Records</h2>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600">GET</Badge>
                <code className="text-lg">/records</code>
              </div>
              <CardDescription>List all records with pagination and filters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Query Parameters</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Parameter</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2"><code>page</code></td>
                      <td>number</td>
                      <td>Page number (default: 1)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><code>limit</code></td>
                      <td>number</td>
                      <td>Items per page (default: 10)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><code>search</code></td>
                      <td>string</td>
                      <td>Search in title/description</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><code>status</code></td>
                      <td>string</td>
                      <td>ACTIVE, PENDING, COMPLETED, ARCHIVED</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><code>priority</code></td>
                      <td>string</td>
                      <td>LOW, MEDIUM, HIGH, URGENT</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code>categoryId</code></td>
                      <td>string</td>
                      <td>Filter by category ID</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">POST</Badge>
                <code className="text-lg">/records</code>
              </div>
              <CardDescription>Create a new record</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "title": "My Record",
  "description": "Optional description",
  "content": "Detailed content here",
  "status": "ACTIVE",
  "priority": "MEDIUM",
  "dueDate": "2024-12-31T23:59:59Z",
  "tags": ["important", "work"],
  "categoryId": "clx456..."
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600">GET</Badge>
                <code className="text-lg">/records/[id]</code>
              </div>
              <CardDescription>Get a single record by ID</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Returns the complete record details.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-600">PATCH</Badge>
                <code className="text-lg">/records/[id]</code>
              </div>
              <CardDescription>Update an existing record</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Send only the fields you want to update.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-600">DELETE</Badge>
                <code className="text-lg">/records/[id]</code>
              </div>
              <CardDescription>Delete a record</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Permanently deletes the record.</p>
            </CardContent>
          </Card>
        </section>

        {/* Categories API */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Categories</h2>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600">GET</Badge>
                <code className="text-lg">/categories</code>
              </div>
              <CardDescription>List all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Returns all categories with record count.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">POST</Badge>
                <code className="text-lg">/categories</code>
              </div>
              <CardDescription>Create a new category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Request Body</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "name": "Work Projects",
  "description": "Work-related records",
  "color": "#6366f1",
  "icon": "briefcase"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dashboard API */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600">GET</Badge>
                <code className="text-lg">/dashboard/stats</code>
              </div>
              <CardDescription>Get dashboard statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Response</h4>
                <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "overview": {
    "totalRecords": 25,
    "activeRecords": 10,
    "completedRecords": 12,
    "pendingRecords": 3,
    "archivedRecords": 0,
    "urgentRecords": 2,
    "highPriorityRecords": 5,
    "totalCategories": 4
  },
  "recentRecords": [...],
  "upcomingDueDates": [...]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Error Codes */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Error Codes</h2>
          
          <Card>
            <CardContent className="pt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Code</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2"><code>400</code></td>
                    <td>Bad Request - Invalid input data</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>401</code></td>
                    <td>Unauthorized - Authentication required</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>403</code></td>
                    <td>Forbidden - Access denied</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>404</code></td>
                    <td>Not Found - Resource doesn't exist</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>500</code></td>
                    <td>Internal Server Error</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
