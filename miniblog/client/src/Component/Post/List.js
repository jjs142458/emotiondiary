import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../Style/ListCSS";

function List() {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    axios.post("/api/post/list").then((res) => {
      console.log(res);
      if (res.data.success) {
        setPostList([...res.data.postList]);
      }
    });
  }, []);

  return (
    <ListDiv>
      {PostList.map((post) => {
        return (
          <ListItem>
            <p>제목 : {post.title}</p>
            <p>내용 : {post.content}</p>
            <hr />
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;
