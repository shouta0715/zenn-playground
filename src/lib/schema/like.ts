import { number, object } from "valibot";

export const likeSchema = object({
  postId: number(),
});
