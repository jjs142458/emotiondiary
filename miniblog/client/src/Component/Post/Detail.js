import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BtnDiv, Post, PostDiv } from "../../Style/DetailCSS";

function Detail() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo]);

  return (
    <div>
      {Flag ? (
        <PostDiv>
          <Post>
            <h1>제목 {PostInfo.title}</h1>
            <hr />
            <p>내용 {PostInfo.content}</p>
          </Post>
          <BtnDiv>
            <Link to={`/edit/${PostInfo.postNum}`}>
              <button className="edit">수정</button>
            </Link>
            <button className="delete">삭제</button>
          </BtnDiv>
        </PostDiv>
      ) : null}
    </div>
  );
}

export default Detail;
