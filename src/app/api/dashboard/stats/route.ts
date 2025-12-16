import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [
      totalRecords,
      activeRecords,
      completedRecords,
      pendingRecords,
      archivedRecords,
      urgentRecords,
      highPriorityRecords,
      totalCategories,
      recentRecords,
      recordsByCategory,
      recordsByStatus,
      recordsByPriority,
    ] = await Promise.all([
      prisma.record.count({ where: { userId } }),
      prisma.record.count({ where: { userId, status: "ACTIVE" } }),
      prisma.record.count({ where: { userId, status: "COMPLETED" } }),
      prisma.record.count({ where: { userId, status: "PENDING" } }),
      prisma.record.count({ where: { userId, status: "ARCHIVED" } }),
      prisma.record.count({ where: { userId, priority: "URGENT" } }),
      prisma.record.count({ where: { userId, priority: "HIGH" } }),
      prisma.category.count({ where: { userId } }),
      prisma.record.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          category: { select: { name: true, color: true } },
        },
      }),
      prisma.category.findMany({
        where: { userId },
        include: {
          _count: { select: { records: true } },
        },
      }),
      prisma.record.groupBy({
        by: ["status"],
        where: { userId },
        _count: { status: true },
      }),
      prisma.record.groupBy({
        by: ["priority"],
        where: { userId },
        _count: { priority: true },
      }),
    ]);

    const upcomingDueDates = await prisma.record.findMany({
      where: {
        userId,
        dueDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        status: { not: "COMPLETED" },
      },
      orderBy: { dueDate: "asc" },
      take: 5,
      select: {
        id: true,
        title: true,
        dueDate: true,
        priority: true,
      },
    });

    return NextResponse.json({
      overview: {
        totalRecords,
        activeRecords,
        completedRecords,
        pendingRecords,
        archivedRecords,
        urgentRecords,
        highPriorityRecords,
        totalCategories,
      },
      recentRecords,
      upcomingDueDates,
      charts: {
        recordsByCategory: recordsByCategory.map((c: { name: string; color: string; _count: { records: number } }) => ({
          name: c.name,
          color: c.color,
          count: c._count.records,
        })),
        recordsByStatus,
        recordsByPriority,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
