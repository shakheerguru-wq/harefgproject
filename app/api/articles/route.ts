import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST → Submit a new article
export async function POST(req: NextRequest) {
  // Cast session as ANY to avoid TS complaining
  const session = (await getServerSession(authOptions)) as any;

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        published: false, // new articles start unpublished
        authorId: session.user.id, // TS-safe because of the cast
      },
    });

    return NextResponse.json(
      { message: "Article submitted", article },
      { status: 201 }
    );
  } catch (error) {
    console.error("SUBMIT ARTICLE ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET → Fetch published articles only
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("PUBLIC GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
