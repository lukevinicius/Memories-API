import { Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";
import {
  createPost,
  findPost,
  findPostsUser,
  findAndUpdate,
  deletePost,
} from "../service/post.service";

// Criação de Post
export async function createPostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const post = await createPost({ ...body, user: userId });

  return res.send(post);
}

// Edição de Post
export async function updatePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");
  const update = req.body;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedPost = await findAndUpdate({ postId }, update, { new: true });

  return res.send(updatedPost);
}

export async function getPostsUserHandler(req: Request, res: Response) {
  try {
    const user = get(req, "params.userId");
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: 'Campos obrigatórios' })
    }

    const post = await findPostsUser({ user });

    if (!post) {
      return res.sendStatus(404);
    }

    return res.send(post);
  } catch (err) {
    log.error(err)
    return res.status(409).send(err.message);
  }
}

export async function getPostHandler(req: Request, res: Response) {
  const postId = get(req, "params.postId");
  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function deletePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deletePost({ postId });

  return res.sendStatus(200);
}
