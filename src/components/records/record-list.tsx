"use client";

import { Record } from "@/lib/hooks/use-records";
import { RecordCard } from "./record-card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

interface RecordListProps {
  records: Record[];
  loading: boolean;
  onView: (record: Record) => void;
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
}

export function RecordList({
  records,
  loading,
  onView,
  onEdit,
  onDelete,
}: RecordListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No records found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first record to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record) => (
        <RecordCard
          key={record.id}
          record={record}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
