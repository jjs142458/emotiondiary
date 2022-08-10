import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListDiv, ListItem } from "../../Style/ListCSS";
import Avatar from "react-avatar";

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
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                {post.title}
              </p>
              <p>{post.content}</p>
              <hr />
              <Avatar size="40" round={true} src={post.author.photoURL} />
              <p>작성자 : {post.author.displayName}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;
