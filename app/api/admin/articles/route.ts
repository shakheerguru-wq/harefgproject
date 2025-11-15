import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET → fetch all articles (admin)
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

// PATCH → toggle published status
export async function PATCH(req: NextRequest) {
  try {
    const { id, published } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const article = await prisma.article.update({
      where: { id },
      data: { published },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}
