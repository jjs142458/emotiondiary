import React, { useState, useEffect } from "react";
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
    <div>
      {RepleList.map((reple, idx) => {
        return <div key={idx}>{reple.reple}</div>;
      })}
    </div>
  );
}

export default RepleList;
