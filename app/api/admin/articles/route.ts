import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 🔐 Safe Admin Check
async function requireAdmin() {
  // Quick fix for TypeScript during build
  const session = await getServerSession(authOptions) as any;

  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return session;
}

// GET → Fetch all articles (admin only)
export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const articles = await prisma.article.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("ADMIN GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// PATCH → Toggle published status
export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, published } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    const article = await prisma.article.update({
      where: { id },
      data: { published },
    });

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("ADMIN PATCH ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}
