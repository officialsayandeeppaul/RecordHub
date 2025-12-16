"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RecordList } from "@/components/records/record-list";
import { RecordForm } from "@/components/records/record-form";
import { useRecords, Record } from "@/lib/hooks/use-records";
import { useCategories } from "@/lib/hooks/use-categories";
import { Plus, Search, X, Download } from "lucide-react";
import { toast } from "sonner";

function RecordsContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    records,
    pagination,
    loading,
    fetchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useRecords();
  const { categories, fetchCategories } = useCategories();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get("priority") || "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("categoryId") || "");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<Record | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const loadRecords = useCallback(() => {
    fetchRecords({
      search: search || undefined,
      status: statusFilter || undefined,
      priority: priorityFilter || undefined,
      categoryId: categoryFilter || undefined,
    });
  }, [fetchRecords, search, statusFilter, priorityFilter, categoryFilter]);

  useEffect(() => {
    if (status === "authenticated") {
      loadRecords();
      fetchCategories();
    }
  }, [status, loadRecords, fetchCategories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadRecords();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setCategoryFilter("");
  };

  const handleCreate = async (data: Parameters<typeof createRecord>[0]) => {
    setIsSubmitting(true);
    try {
      await createRecord(data);
      setIsCreateOpen(false);
      toast.success("Record created successfully");
    } catch {
      toast.error("Failed to create record");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: Parameters<typeof updateRecord>[1]) => {
    if (!editingRecord) return;
    setIsSubmitting(true);
    try {
      await updateRecord(editingRecord.id, data);
      setEditingRecord(null);
      toast.success("Record updated successfully");
    } catch {
      toast.error("Failed to update record");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingRecord) return;
    try {
      await deleteRecord(deletingRecord.id);
      setDeletingRecord(null);
      toast.success("Record deleted successfully");
    } catch {
      toast.error("Failed to delete record");
    }
  };

  const handleExportCSV = () => {
    if (records.length === 0) {
      toast.error("No records to export");
      return;
    }

    const headers = ["Title", "Description", "Status", "Priority", "Category", "Due Date", "Tags", "Created At"];
    const csvContent = [
      headers.join(","),
      ...records.map((record) => [
        `"${record.title.replace(/"/g, '""')}"`,
        `"${(record.description || "").replace(/"/g, '""')}"`,
        record.status,
        record.priority,
        record.category?.name || "Uncategorized",
        record.dueDate ? new Date(record.dueDate).toLocaleDateString() : "",
        `"${record.tags.join(", ")}"`,
        new Date(record.createdAt).toLocaleDateString(),
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `records-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("Records exported successfully");
  };

  if (status === "loading") {
    return null;
  }

  const hasFilters = search || statusFilter || priorityFilter || categoryFilter;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Records</h1>
            <p className="text-muted-foreground">
              Manage and organize all your records
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Record
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasFilters && (
              <Button variant="ghost" size="icon" onClick={handleClearFilters}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <RecordList
          records={records}
          loading={loading}
          onView={(record) => router.push(`/records/${record.id}`)}
          onEdit={setEditingRecord}
          onDelete={setDeletingRecord}
        />

        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={pagination.page <= 1}
              onClick={() => fetchRecords({ page: pagination.page - 1 })}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => fetchRecords({ page: pagination.page + 1 })}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Record</DialogTitle>
            <DialogDescription>
              Add a new record to your collection
            </DialogDescription>
          </DialogHeader>
          <RecordForm
            categories={categories}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
            <DialogDescription>
              Update the record details
            </DialogDescription>
          </DialogHeader>
          {editingRecord && (
            <RecordForm
              record={editingRecord}
              categories={categories}
              onSubmit={handleUpdate}
              onCancel={() => setEditingRecord(null)}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingRecord} onOpenChange={() => setDeletingRecord(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingRecord?.title}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function RecordsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">Loading...</div>}>
      <RecordsContent />
    </Suspense>
  );
}
