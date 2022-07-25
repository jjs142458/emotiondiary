import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function List(props) {
  const [Text, setText] = useState("");
  useEffect(() => {
    let body = {
      text: props.ContentList,
    };

    axios
      .post("/api/test", body)
      .then((res) => {
        console.log(res);
        setText(res.data.text);
      })
      .catch((err) => {
        alert("요청 실패");
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>List!</h3>
      <h3>{Text}</h3>
      {props.ContentList.map((dataList, idx) => {
        return (
          <div key={idx} style={{ width: "100%", marginLeft: "1rem" }}>
            <p />
            제목 : {dataList.title}
            <p />
            내용 : {dataList.content}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default List;
