import { object, string } from "yup";

const payload = {
  body: object({
    title: string().required("O Titulo é obrigatorio"),
    body: string()
      .required("O texto é obrigatorio")
      .min(120, "Seu texto é muito curto - É necessario no mínimo 120 caractéres."),
  }),
};

const params = {
  params: object({
    postId: string().required("postId is required"),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...params,
  ...payload,
});

export const deletePostSchema = object({
  ...params,
});
