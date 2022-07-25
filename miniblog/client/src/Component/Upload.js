import React, { useState } from "react";
import {
  UploadDiv,
  UploadForm,
  UpoadButtonDiv,
  UploadFormDiv,
} from "../Style/UploadCSS.js";

function Upload(props) {
  const [dataList, setDataList] = useState({
    title: "",
    content: "",
  });

  console.log(dataList);

  const onChange = (e) => {
    const { id, value } = e.target;
    setDataList({
      ...dataList, // 기존의 dataList 값을 가져온다음에
      [id]: value, // id가 title이면 title을 바꾸고 id가 content이면 content를 바꾼다
    });
  };

  const onSubmit = () => {
    if (dataList.title.length > 0 && dataList.content.length > 0) {
      props.setContentList([...props.ContentList, dataList]);
      setDataList({
        title: "",
        content: "",
      });
    } else {
      alert("1글자 이상 입력해주세요.");
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      if (dataList.title.length > 0) {
        onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
      } else {
        alert("1글자 이상입력해주세요.");
      }
    }
  };

  return (
    <UploadDiv onKeyPress={handleOnKeyPress}>
      <UploadFormDiv>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={dataList.title}
          onChange={onChange}
        />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          type="text"
          value={dataList.content}
          onChange={onChange}
        />
        <UpoadButtonDiv>
          <button onClick={onSubmit} style={{ marginTop: "1rem" }}>
            제출
          </button>
        </UpoadButtonDiv>
      </UploadFormDiv>
    </UploadDiv>
  );
}

export default Upload;
