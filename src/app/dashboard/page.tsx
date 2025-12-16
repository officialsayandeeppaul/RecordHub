"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  FolderOpen,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Plus,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

interface DashboardStats {
  overview: {
    totalRecords: number;
    activeRecords: number;
    completedRecords: number;
    pendingRecords: number;
    archivedRecords: number;
    urgentRecords: number;
    highPriorityRecords: number;
    totalCategories: number;
  };
  recentRecords: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    createdAt: string;
    category?: { name: string; color: string } | null;
  }>;
  upcomingDueDates: Array<{
    id: string;
    title: string;
    dueDate: string;
    priority: string;
  }>;
}

const priorityColors: Record<string, string> = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const statCards = [
    {
      title: "Total Records",
      value: stats?.overview.totalRecords || 0,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active",
      value: stats?.overview.activeRecords || 0,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Completed",
      value: stats?.overview.completedRecords || 0,
      icon: CheckCircle2,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Categories",
      value: stats?.overview.totalCategories || 0,
      icon: FolderOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {session.user?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your records and activities.
            </p>
          </div>
          <Link href="/records/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Record
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`rounded-full p-3 ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {(stats?.overview.urgentRecords || 0) > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">
                    You have {stats?.overview.urgentRecords} urgent record(s)
                  </p>
                  <p className="text-sm text-red-700">
                    These require immediate attention
                  </p>
                </div>
                <Link href="/records?priority=URGENT" className="ml-auto">
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                    View All
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Records</CardTitle>
                <CardDescription>Your latest created records</CardDescription>
              </div>
              <Link href="/records">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {stats?.recentRecords && stats.recentRecords.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentRecords.map((record) => (
                    <Link
                      key={record.id}
                      href={`/records/${record.id}`}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {record.category && (
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: record.category.color }}
                          />
                        )}
                        <div>
                          <p className="font-medium">{record.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(record.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <Badge className={priorityColors[record.priority]}>
                        {record.priority}
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No records yet</p>
                  <Link href="/records/new">
                    <Button variant="link" size="sm">
                      Create your first record
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Due Dates</CardTitle>
                <CardDescription>Records due in the next 7 days</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {stats?.upcomingDueDates && stats.upcomingDueDates.length > 0 ? (
                <div className="space-y-4">
                  {stats.upcomingDueDates.map((record) => (
                    <Link
                      key={record.id}
                      href={`/records/${record.id}`}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{record.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Due: {format(new Date(record.dueDate), "MMM d, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                      </div>
                      <Badge className={priorityColors[record.priority]}>
                        {record.priority}
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No upcoming due dates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
