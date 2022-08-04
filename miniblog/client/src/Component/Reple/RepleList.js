import React, { useState, useEffect } from "react";
import axios from "axios";
import { RepleContentDiv, RepleListDiv } from "../../Style/RepleCSS";

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
    <RepleListDiv>
      {RepleList.map((reple, idx) => {
        return (
          <RepleContentDiv key={idx}>
            <div className="author">
              <p>{reple.author.displayName}</p>
              <div className="modalControl">
                <span>...</span>
                <div className="modalDiv">
                  <p>수정</p>
                  <p className="delete">삭제</p>
                </div>
              </div>
            </div>
            <p>{reple.reple}</p>
          </RepleContentDiv>
        );
      })}
    </RepleListDiv>
  );
}

export default RepleList;
