import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BtnDiv, Post, PostDiv } from "../../Style/DetailCSS";

function Detail() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  const [Delete, setDelete] = useState(false);
  let navigate = useNavigate();

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
    if (Delete) {
      axios
        .delete("/api/post/delete", {
          data: { postNum: params.postNum },
        })
        .then((res) => {
          if (res.data.success) {
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <div>
      {Flag ? (
        <PostDiv>
          <Post>
            <h1>{PostInfo.title}</h1>
            <hr />
            {PostInfo.image ? (
              <>
                <img
                  src={PostInfo.image}
                  alt=""
                  style={{ maxWidth: "100%", maxHeight: "auto" }}
                />
                <hr />
              </>
            ) : null}
            <p>{PostInfo.content}</p>
          </Post>
          <BtnDiv>
            <Link to={`/edit/${PostInfo.postNum}`}>
              <button className="edit">수정</button>
            </Link>
            <button
              className="delete"
              onClick={() => {
                setDelete(true);
              }}
            >
              삭제
            </button>
          </BtnDiv>
        </PostDiv>
      ) : null}
    </div>
  );
}

export default Detail;
