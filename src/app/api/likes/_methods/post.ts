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
    await prisma.like.create({
      data: {
        postId,
        userId: 2,
      },
    });

    const data = {
      message: "Like created",
      liked: true,
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    return handleApiError({ error });
  }
};

export const POST = handler;
