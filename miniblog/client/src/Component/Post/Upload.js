import React, { useState } from "react";
import {
  UploadDiv,
  UploadForm,
  UpoadButtonDiv,
} from "../../Style/UploadCSS.js";
import axios from "axios";

function Upload(props) {
  const [dataList, setDataList] = useState({
    title: "",
    content: "",
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setDataList({
      ...dataList, // 기존의 dataList 값을 가져온다음에
      [id]: value, // id가 title이면 title을 바꾸고 id가 content이면 content를 바꾼다
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (dataList.title.length > 0 && dataList.content.length > 0) {
      setDataList({
        title: "",
        content: "",
      });

      let body = dataList;

      axios
        .post("/api/post/submit", body)
        .then((res) => {
          if (res.data.success) {
            alert("글 작성이 성공하였습니다.");
          } else {
            alert("글 작성에 실패하였습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
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
    <UploadDiv>
      <UploadForm>
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
          <button onClick={(e) => onSubmit(e)} style={{ marginTop: "1rem" }}>
            제출
          </button>
        </UpoadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
