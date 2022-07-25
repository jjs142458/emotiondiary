import React, { useEffect, useState } from "react";
import { UploadDiv, UploadForm, UpoadButtonDiv } from "../Style/UploadCSS.js";

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
    <UploadDiv onKeyPress={handleOnKeyPress}>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={Content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          type="text"
          value={Content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
        <UpoadButtonDiv>
          <button
            onClick={() => {
              onSubmit();
            }}
            style={{ marginTop: "1rem" }}
          >
            제출
          </button>
        </UpoadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
