import React, { useState, useEffect } from "react";
import List from "./Post/List.js";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";

function MainPage() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState("최신순");

  useEffect(() => {
    let body = {
      sort: Sort,
    };
    axios
      .post("/api/post/list", body)
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Sort]);
  return (
    <div>
      <DropdownButton variant="outline-secondary" title={Sort}>
        <Dropdown.Item onClick={() => setSort("최신순")}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("인기순")}>인기순</Dropdown.Item>
      </DropdownButton>
      <List PostList={PostList} />
    </div>
  );
}

export default MainPage;
