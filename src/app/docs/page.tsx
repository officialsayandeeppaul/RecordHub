"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  FolderOpen,
  LayoutDashboard,
  Search,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">Documentation</Badge>
          <h1 className="text-4xl font-bold">RecordHub Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to use RecordHub to manage your records efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/docs#getting-started">
            <Card className="hover:border-black transition-colors cursor-pointer h-full">
              <CardHeader>
                <Zap className="h-8 w-8 mb-2" />
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Quick start guide to begin using RecordHub</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/docs#features">
            <Card className="hover:border-black transition-colors cursor-pointer h-full">
              <CardHeader>
                <Search className="h-8 w-8 mb-2" />
                <CardTitle>Features</CardTitle>
                <CardDescription>Explore all features and capabilities</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/api-docs">
            <Card className="hover:border-black transition-colors cursor-pointer h-full">
              <CardHeader>
                <FileText className="h-8 w-8 mb-2" />
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Complete API documentation for developers</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Getting Started */}
        <section id="getting-started" className="space-y-6">
          <h2 className="text-3xl font-bold">Getting Started</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>1. Create an Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Create your RecordHub account to get started - it only takes a minute.</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Click "Get Started" on the homepage</li>
                <li>Enter your name, email, and password</li>
                <li>Verify your email address</li>
                <li>You're ready to go!</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Create Your First Record</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Records are at the heart of RecordHub. Here's how to create your first one:</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Navigate to the Records page</li>
                <li>Click "New Record"</li>
                <li>Fill in the title, description, and content</li>
                <li>Set status, priority, and due date</li>
                <li>Add tags for easy searching</li>
                <li>Click "Create Record"</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Organize with Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Keep things tidy by grouping related records into categories.</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Go to the Categories page</li>
                <li>Click "New Category"</li>
                <li>Choose a name, color, and icon</li>
                <li>Assign records to categories when creating or editing</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section id="features" className="space-y-6">
          <h2 className="text-3xl font-bold">Features</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <LayoutDashboard className="h-6 w-6 mb-2" />
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get an overview of all your records, see statistics, track recent activity, 
                  and monitor upcoming due dates all in one place.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-6 w-6 mb-2" />
                <CardTitle>Records Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create, edit, and delete records with rich content. Set status (Active, Pending, 
                  Completed, Archived) and priority (Low, Medium, High, Urgent).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FolderOpen className="h-6 w-6 mb-2" />
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organize records with custom categories. Each category has a unique color 
                  and icon for easy visual identification.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Search className="h-6 w-6 mb-2" />
                <CardTitle>Search & Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Powerful search functionality with filters for status, priority, category, 
                  and tags. Find any record instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Security
          </h2>
          
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span><strong>Password Hashing:</strong> Bcrypt with 12 rounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span><strong>Session Management:</strong> JWT-based secure sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span><strong>Input Validation:</strong> Zod schema validation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span><strong>SQL Injection Prevention:</strong> Prisma ORM parameterized queries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span><strong>XSS Protection:</strong> React's built-in escaping</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link 
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
