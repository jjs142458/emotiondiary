import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListDiv, ListItem } from "../../Style/ListCSS";

function List() {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    axios.post("/api/post/list").then((res) => {
      if (res.data.success) {
        setPostList([...res.data.postList]);
      }
    });
  }, []);

  return (
    <ListDiv>
      {PostList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.postNum}`}>
              <p>제목 : {post.title}</p>
              <p>내용 : {post.content}</p>
              <p>작성자 :{post.author.displayName}</p>
              <hr />
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;
