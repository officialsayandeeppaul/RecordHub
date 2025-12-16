"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  const initials = session.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage 
                  src={session.user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(session.user?.name || session.user?.email || "User")}`} 
                  alt={session.user?.name || ""} 
                />
                <AvatarFallback className="text-xl bg-black text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{session.user?.name}</h3>
                <p className="text-muted-foreground">{session.user?.email}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{session.user?.name || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{session.user?.email || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">Recently joined</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
