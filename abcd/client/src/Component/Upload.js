import React, { useEffect, useState } from "react";

function Upload(props) {
  const [Content, setContent] = useState("");

  const onSubmit = () => {
    let tempArr = [...props.ContentList];
    tempArr.push(Content);
    props.setContentList([...tempArr]);
    setContent("");
    console.log(tempArr);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <input
        type="text"
        value={Content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          onSubmit();
        }}
        style={{ marginTop: "1rem" }}
      >
        제출
      </button>
    </div>
  );
}

export default Upload;
