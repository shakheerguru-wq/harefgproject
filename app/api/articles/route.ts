import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Replace this with an actual user ID from your database
const DEFAULT_USER_ID = "1076eff2-86bb-47bc-bef2-c69bdf9500e6";

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: DEFAULT_USER_ID, // authorId is required
      },
    });

    return NextResponse.json({ message: "Article submitted", article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
