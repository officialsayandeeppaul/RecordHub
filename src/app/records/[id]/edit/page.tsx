"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Record } from "@/lib/hooks/use-records";
import { useCategories } from "@/lib/hooks/use-categories";
import { RecordForm } from "@/components/records/record-form";

export default function EditRecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categories, fetchCategories } = useCategories();

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
          toast.error("Record not found");
          router.push("/records");
        }
      } catch (error) {
        console.error("Failed to fetch record:", error);
        toast.error("Failed to load record");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && id) {
      fetchRecord();
      fetchCategories();
    }
  }, [status, id, router, fetchCategories]);

  const handleUpdate = async (data: { [key: string]: unknown }) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/records/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Record updated successfully");
        router.push(`/records/${id}`);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update record");
      }
    } catch {
      toast.error("Failed to update record");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[500px]" />
        </div>
      </div>
    );
  }

  if (!record) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/records/${id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Record</h1>
            <p className="text-muted-foreground">Update the details of your record</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Record Details</CardTitle>
            <CardDescription>
              Make changes to your record below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecordForm
              record={record}
              categories={categories}
              onSubmit={handleUpdate}
              onCancel={() => router.push(`/records/${id}`)}
              isLoading={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
