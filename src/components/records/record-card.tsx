"use client";

import { Record } from "@/lib/hooks/use-records";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { cn } from "@/lib/utils";

interface RecordCardProps {
  record: Record;
  onView: (record: Record) => void;
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
}

const priorityColors = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  MEDIUM: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  URGENT: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const statusColors = {
  ACTIVE: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  COMPLETED: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  ARCHIVED: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export function RecordCard({
  record,
  onView,
  onEdit,
  onDelete,
}: RecordCardProps) {
  const isOverdue =
    record.dueDate &&
    new Date(record.dueDate) < new Date() &&
    record.status !== "COMPLETED";

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1 min-w-0">
            <h3
              className="font-semibold text-lg leading-tight truncate cursor-pointer hover:text-primary transition-colors"
              onClick={() => onView(record)}
            >
              {record.title}
            </h3>
            {record.category && (
              <div className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: record.category.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {record.category.name}
                </span>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(record)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(record)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(record)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {record.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {record.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge className={cn("text-xs", statusColors[record.status])}>
            {record.status}
          </Badge>
          <Badge className={cn("text-xs", priorityColors[record.priority])}>
            {record.priority}
          </Badge>
        </div>

        {record.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {record.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {record.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{record.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(record.createdAt), { addSuffix: true })}
          </div>
          {record.dueDate && (
            <div
              className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive font-medium"
              )}
            >
              <Calendar className="h-3 w-3" />
              {format(new Date(record.dueDate), "MMM d, yyyy")}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
