"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Shield } from "lucide-react";

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">Changelog</Badge>
          <h1 className="text-4xl font-bold">What's New in RecordHub</h1>
          <p className="text-xl text-muted-foreground">
            Track all updates, improvements, and bug fixes.
          </p>
        </div>

        {/* Version 1.0.0 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Version 1.0.0</CardTitle>
              <Badge>Latest</Badge>
            </div>
            <CardDescription>December 2024 - Initial Release</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-yellow-500" />
                New Features
              </h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-7">
                <li>Full CRUD operations for records management</li>
                <li>User authentication with secure credentials</li>
                <li>Categories with custom colors and icons</li>
                <li>Dashboard with statistics and recent activity</li>
                <li>Advanced search and filtering capabilities</li>
                <li>Due date tracking with visual indicators</li>
                <li>Tags support for better organization</li>
                <li>Profile and settings pages</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-green-500" />
                Security
              </h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-7">
                <li>Bcrypt password hashing (12 rounds)</li>
                <li>JWT-based session management</li>
                <li>Input validation with Zod schemas</li>
                <li>SQL injection prevention via Prisma</li>
                <li>XSS protection</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Features</CardTitle>
            <CardDescription>What we're working on next</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Badge variant="outline">Planned</Badge>
                <span className="text-muted-foreground">Dark mode support</span>
              </li>
              <li className="flex items-center gap-3">
                <Badge variant="outline">Planned</Badge>
                <span className="text-muted-foreground">Export records to PDF/CSV</span>
              </li>
              <li className="flex items-center gap-3">
                <Badge variant="outline">Planned</Badge>
                <span className="text-muted-foreground">Team collaboration features</span>
              </li>
              <li className="flex items-center gap-3">
                <Badge variant="outline">Planned</Badge>
                <span className="text-muted-foreground">Email notifications for due dates</span>
              </li>
              <li className="flex items-center gap-3">
                <Badge variant="outline">Planned</Badge>
                <span className="text-muted-foreground">Mobile app (React Native)</span>
              </li>
              <li className="flex items-center gap-3">
                <Badge variant="outline">Planned</Badge>
                <span className="text-muted-foreground">Advanced analytics dashboard</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contributing */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Want to Contribute?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              RecordHub is open source! We welcome contributions from the community.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Report bugs and issues on GitHub</li>
              <li>Submit feature requests</li>
              <li>Create pull requests for improvements</li>
              <li>Help improve documentation</li>
            </ul>
          </CardContent>
        </Card>

        {/* Author */}
        <div className="text-center pt-8 border-t">
          <p className="text-muted-foreground mb-2">Built with ❤️ by</p>
          <p className="font-semibold text-lg">Sayandeep Paul</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="https://github.com/officialsayandeeppaul" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/sayandeeppaul" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
