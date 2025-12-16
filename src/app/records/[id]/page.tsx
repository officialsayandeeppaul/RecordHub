"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Record } from "@/lib/hooks/use-records";

const priorityColors: { [key: string]: string } = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

const statusColors: { [key: string]: string } = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  ARCHIVED: "bg-gray-100 text-gray-700",
};

export default function RecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`/api/records/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecord(data);
        } else if (response.status === 404) {
          router.push("/records");
        }
      } catch (error) {
        console.error("Failed to fetch record:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && id) {
      fetchRecord();
    }
  }, [status, id, router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`/api/records/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Record deleted");
        router.push("/records");
      } else {
        toast.error("Failed to delete record");
      }
    } catch {
      toast.error("Failed to delete record");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!record) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/records">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{record.title}</h1>
            {record.category && (
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: record.category.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {record.category.name}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Link href={`/records/${id}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className={statusColors[record.status]}>{record.status}</Badge>
          <Badge className={priorityColors[record.priority]}>{record.priority}</Badge>
          {record.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {record.description && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Description
                </h4>
                <p>{record.description}</p>
              </div>
            )}

            {record.content && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Content
                </h4>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                  {record.content}
                </div>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Created: {format(new Date(record.createdAt), "PPp")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Updated: {format(new Date(record.updatedAt), "PPp")}</span>
              </div>
              {record.dueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {format(new Date(record.dueDate), "PPp")}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
