import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div>
          <p>제목 {PostInfo.title}</p>
          <p>내용 {PostInfo.content}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Detail;
