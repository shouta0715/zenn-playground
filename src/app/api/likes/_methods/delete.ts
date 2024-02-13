import { handleApiError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { likeSchema } from "@/lib/schema/like";
import { validate } from "@/lib/validation";

const handler = async (req: Request) => {
  try {
    const body = await req.json();

    validate(body, likeSchema);

    const { postId } = body;

    // 本来はログインユーザーのIDを取得する
    await prisma.like.deleteMany({
      where: {
        userId: 2,
        postId,
      },
    });

    const data = {
      message: "Like deleted",
      liked: false,
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const DELETE = handler;
