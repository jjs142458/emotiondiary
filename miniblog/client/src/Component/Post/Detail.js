import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BtnDiv, Post, PostDiv } from "../../Style/PostDetailCSS";
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";

function Detail(props) {
  let params = useParams();
  const [Delete, setDelete] = useState(false);
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };

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
    <PostDiv>
      <Post>
        <h1>{props.PostInfo.title}</h1>
        <div className="author">
          <Avatar
            size="40"
            round={true}
            src={props.PostInfo.author.photoURL}
            style={{ border: "1px solid #c6c6c6" }}
          />
          <p>{props.PostInfo.author.displayName}</p>
          <p className="time">
            {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
          </p>
        </div>
        {props.PostInfo.image ? (
          <img
            src={props.PostInfo.image}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}
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
  );
}

export default Detail;
