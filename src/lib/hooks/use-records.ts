"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface Record {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED" | "PENDING";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: string | null;
  tags: string[];
  categoryId?: string | null;
  category?: {
    id: string;
    name: string;
    color: string;
    icon: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecordsResponse {
  records: Record[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RecordFilters {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  categoryId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export function useRecords() {
  const [records, setRecords] = useState<Record[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchRecords = useCallback(async (filters: RecordFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });

      const response = await fetch(`/api/records?${params.toString()}`);
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }
        throw new Error("Failed to fetch records");
      }

      const data: RecordsResponse = await response.json();
      setRecords(data.records);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const createRecord = useCallback(async (data: Partial<Record>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create record");
      }

      const newRecord = await response.json();
      setRecords((prev) => [newRecord, ...prev]);
      return newRecord;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRecord = useCallback(async (id: string, data: Partial<Record>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/records/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update record");
      }

      const updatedRecord = await response.json();
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? updatedRecord : r))
      );
      return updatedRecord;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/records/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete record");
      }

      setRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    records,
    pagination,
    loading,
    error,
    fetchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}
