import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
//get all comments of a post using post id of that post
export const GET = async (req) => {
  //The front-end sends a request to your API,eg- GET /api/comments?postSlug=how-to-learn-javascript

  //Your code captures the postSlug from the query parameters:
  
  const {searchparams} = new URL(req.url);
  const postSlug = searchparams.get("postSlug")
  try {
    const comments = await prisma.comment.findMany({
     //Prisma filters the comments using this slug:
      where:{
        ...(postSlug && {postSlug}),
       },
       include :{user:true}
    });

    return new NextResponse(
        JSON.stringify(comments, { status: 200 })
      );  
} catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
