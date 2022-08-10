import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BtnDiv, Post, PostDiv } from "../../Style/DetailCSS";
import Avatar from "react-avatar";

function Detail(props) {
  let params = useParams();
  const [Delete, setDelete] = useState(false);
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

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
      <PostDiv>
        <Post>
          <h1>{props.PostInfo.title}</h1>
          <Avatar size="40" round={true} src={props.PostInfo.author.photoURL} />
          <p>작성자 : {props.PostInfo.author.displayName}</p>
          <hr />
          {props.PostInfo.image && (
            <>
              <img
                src={props.PostInfo.image}
                alt=""
                style={{ maxWidth: "100%", maxHeight: "auto" }}
              />
              <hr />
            </>
          )}

          <p>{props.PostInfo.content}</p>
        </Post>
        {user.uid === props.PostInfo.author.uid && (
          <BtnDiv>
            <Link to={`/edit/${props.PostInfo.postNum}`}>
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
        )}
      </PostDiv>
    </div>
  );
}

export default Detail;
