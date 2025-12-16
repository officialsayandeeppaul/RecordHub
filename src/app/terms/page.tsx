"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By accessing and using RecordHub ("the Service"), you accept and agree to be bound 
              by the terms and provisions of this agreement. If you do not agree to these terms, 
              please do not use our Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              RecordHub is a record management system that allows users to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Create, edit, and manage records with rich content</li>
              <li>Organize records using categories and tags</li>
              <li>Track due dates and priorities</li>
              <li>Search and filter records efficiently</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To use RecordHub, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">You agree NOT to use RecordHub to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Store or transmit malicious code or harmful content</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Overload or interfere with the Service's infrastructure</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Your Content:</strong> You retain ownership of all records and content 
              you create in RecordHub. By using the Service, you grant us a limited license 
              to store and process your content to provide the Service.
            </p>
            <p className="text-muted-foreground">
              <strong>Our Content:</strong> RecordHub, including its design, features, and 
              documentation, is owned by us and protected by intellectual property laws. 
              You may not copy, modify, or distribute our content without permission.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Data and Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your use of RecordHub is also governed by our Privacy Policy. By using the 
              Service, you consent to the collection and use of your information as described 
              in the Privacy Policy. We take data security seriously and implement 
              industry-standard measures to protect your information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Service Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We strive to maintain high availability of RecordHub, but we do not guarantee 
              uninterrupted access. The Service may be temporarily unavailable due to 
              maintenance, updates, or circumstances beyond our control. We are not liable 
              for any loss or damage resulting from service interruptions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, RECORDHUB AND ITS CREATORS SHALL NOT 
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE 
              DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR 
              INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY 
              KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES 
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may terminate or suspend your account at any time for violations of these 
              Terms. You may also delete your account at any time. Upon termination, your 
              right to use the Service will immediately cease, and your data will be deleted 
              according to our data retention policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users 
              of significant changes by posting a notice on the Service or sending an email. 
              Your continued use of RecordHub after changes constitutes acceptance of the 
              new Terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>13. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of 
              India, without regard to its conflict of law provisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>14. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Sayandeep Paul</strong><br />
              <a href="https://github.com/officialsayandeeppaul" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a> · <a href="https://linkedin.com/in/sayandeeppaul" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
