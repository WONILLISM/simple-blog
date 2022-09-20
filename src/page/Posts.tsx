import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { Post, usePosts } from "../hooks/api/usePosts";

const Posts = () => {
  const { posts, addPost, editPost, deletePost } = usePosts();

  // add
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleRemovePost = (id: number) => {
    deletePost.mutate(id + 1);
  };

  useEffect(() => {
    posts.refetch();
  }, [posts]);

  return (
    <div>
      {addPost.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          <div style={{ border: "1px solid blue" }}>
            {addPost.isSuccess ? <div>Todo added!</div> : null}
            <div>
              <div>
                <span>title: </span>
                <input
                  type="text"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setTitle(value);
                  }}
                />
              </div>
              <div>
                <span>body: </span>
                <textarea
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setBody(value);
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                addPost.mutate({
                  title: title,
                  body: body,
                });
              }}
            >
              생성
            </button>
          </div>
        </>
      )}
      <div>
        {posts.isLoading ? (
          <div>loading...</div>
        ) : !posts.data ? (
          <div>not data</div>
        ) : (
          <>
            {posts.data.map((post, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid grey",
                  marginBottom: "10px",
                  padding: "16px",

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div>{post.title}</div>
                <div>{post.body}</div>

                <button type="button" onClick={() => handleRemovePost(index)}>
                  삭제
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
