import React, { useState, useEffect } from "react";
import { RepleListDiv } from "../../Style/RepleCSS";
import RepleContent from "./RepleContent";
import axios from "axios";

function RepleList(props) {
  const [RepleList, setRepleList] = useState([]);

  useEffect(() => {
    let body = { postId: props.postId };
    axios.post("/api/reple/getreple", body).then((res) => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
      }
    });
  }, [RepleList]);

  return (
    <>
      <hr />
      {`작성된 댓글 수 : ${RepleList.length}`}
      <p />
      <RepleListDiv>
        {RepleList.map((reple, idx) => {
          return <RepleContent reple={reple} key={idx} />;
        })}
      </RepleListDiv>
    </>
  );
}

export default RepleList;
