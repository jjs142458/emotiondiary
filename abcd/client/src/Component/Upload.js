import React, { useEffect, useState } from "react";

function Upload(props) {
  const [Content, setContent] = useState("");

  const onSubmit = () => {
    if (Content.length > 0) {
      props.setContentList([...props.ContentList, Content]);
      setContent("");
    } else {
      alert("1글자 이상입력해주세요.");
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      if (Content.length > 0) {
        onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
      } else {
        alert("1글자 이상입력해주세요.");
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <div onKeyPress={handleOnKeyPress}>
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
