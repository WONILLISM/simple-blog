import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { Post, usePosts } from "./hooks/api/usePosts";

const Test = () => {
  const { posts, addPost, editPost, deletePost } = usePosts();

  // add
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // edit
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editBody, setEditBody] = useState<string>("");

  const handleRemovePost = (id: number) => {
    deletePost.mutate(id + 1);
  };

  useEffect(() => {
    posts.refetch();
  }, [posts]);

  return (
    <div>
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
                  padding: "10px",
                }}
              >
                {!edit ? (
                  <>
                    <div>title: {post.title}</div>
                    <div>body: {post.body}</div>
                    {!edit && (
                      <button
                        type="button"
                        onClick={() => {
                          setEdit(true);
                        }}
                      >
                        수정
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemovePost(index)}
                    >
                      삭제
                    </button>
                    <br />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setEditTitle(value);
                      }}
                    />
                    <textarea
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setEditBody(value);
                      }}
                    />
                    <button type="button">취소</button>
                    <button type="button">저장</button>
                    <br />
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </div>
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
    </div>
  );
};

export default Test;
