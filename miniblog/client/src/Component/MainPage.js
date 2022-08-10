import React, { useState, useEffect } from "react";
import List from "./Post/List.js";
import axios from "axios";

function MainPage() {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <List PostList={PostList} />
    </div>
  );
}

export default MainPage;
