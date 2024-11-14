import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
//get all comments of a post using post id of that post
export const GET = async (req) => {
  //The front-end sends a request to your API,eg- GET /api/comments?postSlug=how-to-learn-javascript

  //Your code captures the postSlug from the query parameters:

  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  try {
    const comments = await prisma.comment.findMany({
      //Prisma filters the comments using this slug:
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};

//create a comment
export const POST = async (req) => {
  const session = getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not authenticated" }, { status: 401 })
    );
  }
  //when a user enters the comment the post api catches it and is retrieved
  //throught body
  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
