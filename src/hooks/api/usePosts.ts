import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export interface Post {
  id?: number;
  title: string;
  body: string;
}

const fetchPosts = async () => {
  const axiosConfig: AxiosRequestConfig = {
    method: "get",
    url: "http://localhost:8000/posts",
    headers: {},
  };

  const response = await axios(axiosConfig);

  return response.data;
};

const createPost = async (newPost: Post) => {
  const axiosConfig: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:8000/posts",
    headers: {},
    data: newPost,
  };
  const response = await axios(axiosConfig);

  return response;
};

const updatePost = async ({ id, data }: { id: number; data: Post }) => {
  const axiosConfig: AxiosRequestConfig = {
    method: "put",
    url: `http://localhost:8000/posts/${id}`,
    headers: {},
    data: data,
  };

  const response = await axios(axiosConfig);

  return response;
};

const delPost = async (id: number) => {
  const axiosConfig: AxiosRequestConfig = {
    method: "delete",
    url: `http://localhost:8000/posts/${id}`,
    headers: {},
  };

  const response = await axios(axiosConfig);

  return response;
};

export const usePosts = () => {
  const queryClient = useQueryClient();

  const posts = useQuery<Post[], AxiosError>(["posts"], fetchPosts);

  const addPost = useMutation(createPost);

  const editPost = useMutation(updatePost);

  const deletePost = useMutation(delPost);

  return { posts, addPost, editPost, deletePost };
};

// function useQuery<
//   TQueryFnData = unknown,
//   TError = unknown,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey
//   >(options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
//   initialData?: () => undefined;
