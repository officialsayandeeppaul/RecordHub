"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              Welcome to RecordHub. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our record management application. 
              Please read this privacy policy carefully. By using RecordHub, you agree to the 
              collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Name and email address when you create an account</li>
                <li>Password (stored securely using bcrypt hashing)</li>
                <li>Profile information you choose to provide</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Record Data</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Records you create, including titles, descriptions, and content</li>
                <li>Categories and tags you assign to records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Data</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Log data including IP address, browser type, and access times</li>
                <li>Device information and operating system</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>To provide and maintain the RecordHub service</li>
              <li>To authenticate your identity and secure your account</li>
              <li>To improve and optimize our application</li>
              <li>To communicate with you about updates and changes</li>
              <li>To detect and prevent fraud or security issues</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Passwords are hashed using bcrypt with 12 rounds</li>
              <li>All data transmission is encrypted using HTTPS/TLS</li>
              <li>Database access is restricted and monitored</li>
              <li>Regular security audits and updates</li>
              <li>JWT-based session management with secure tokens</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We retain your personal information and records for as long as your account is 
              active. You can delete your records at any time. If you delete your account, 
              all associated data will be permanently removed from our systems within 30 days.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data and account</li>
              <li>Export your records</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">RecordHub uses the following third-party services:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Vercel:</strong> For hosting and deployment</li>
              <li><strong>PostgreSQL:</strong> For data storage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Sayandeep Paul</strong><br />
              <a href="https://github.com/officialsayandeeppaul" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a> · <a href="https://linkedin.com/in/sayandeeppaul" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last 
              updated" date. You are advised to review this Privacy Policy periodically for 
              any changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
