import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
//post a new bookmark to DB
export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    // const { userId, postId } = await req.json();

    const userId = session.user.id; // Assuming `user.id` is part of the session object
    const { postId } = await req.json();
    console.log("Received data:", { userId, postId });

    //CHECKING IF BOOKMARK ALREADY EXISTS
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (existingBookmark) {
      return NextResponse.json(
        { message: "post already bookmarked" },
        { status: 400 }
      );
    }
    //CREATING BOOKMARK
    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

    return NextResponse.json(bookmark, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add bookmark" },
      { status: 500 }
    );
  }
};
//get the bookmarks
export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "not authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    //fetch bookmarks with related post data
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          select: {
            slug: true,
            title: true,
            desc: true,
          },
        },
      },
    });
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "failed to fetch bookmarks" },
      { status: 500 }
    );
  }
};

//delete bookmarks
export const DELETE = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "not authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const { postId } = await req.json();
    const deletedBookmark=await prisma.bookmark.delete({
      where: {
        userId_postId:{ // Use composite unique constraint

          userId,
          postId,
        }
      },
   
    });
    return NextResponse.json(
      { message: "Bookmark deleted successfully",deletedBookmark },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete bookmark" },
      { status: 500 }
    );
  }
};
