import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadDiv,
  UploadForm,
  UpoadButtonDiv,
} from "../../Style/UploadCSS.js";
import { useSelector } from "react-redux";
import axios from "axios";
import ImageUpload from "./ImageUpload.js";

function Upload(props) {
  const user = useSelector((state) => state.user);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인 회원만 글을 작성할 수 있습니다.");
      navigate("/", { replace: true });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === " " || Content === " ") {
      return alert("모든항목을 채워주세요");
    }

    setTitle("");
    setContent("");
    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid,
    };
    console.log(body);
    axios
      .post("/api/post/submit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 작성이 완료되였습니다.");
          navigate("/", { replace: true });
        } else {
          alert("글 작성이 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={Title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          type="text"
          value={Content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
        <UpoadButtonDiv>
          <button
            onClick={(e) => {
              onSubmit(e);
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
