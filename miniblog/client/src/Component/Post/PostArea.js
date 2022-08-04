import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RepleArea from "../Reple/RepleArea";
import Detail from "./Detail";
import axios from "axios";

function PostArea() {
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

  return (
    <div>
      {Flag && (
        <>
          <Detail PostInfo={PostInfo} />
          <RepleArea postId={PostInfo._id} />
        </>
      )}
    </div>
  );
}

export default PostArea;
