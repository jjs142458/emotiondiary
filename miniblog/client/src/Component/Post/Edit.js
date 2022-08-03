import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  UploadDiv,
  UploadForm,
  UpoadButtonDiv,
} from "../../Style/UploadCSS.js";

function Edit() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (e) => {
    const { id, value } = e.target;
    setPostInfo({
      ...PostInfo,
      [id]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (PostInfo.title === " " || PostInfo.content === " ") {
      return alert("모든항목을 채워주세요");
    }

    let body = PostInfo;

    axios
      .put("/api/post/edit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 수정이 완료되였습니다.");
          navigate(`/post/${params.postNum}`, { replace: true });
        } else {
          alert("글 수정에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FileUpload = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/post/image/upload", formData).then((res) => {
      setPostInfo((prevState) => {
        return { ...prevState, image: res.data.filePath };
      });
      console.log(PostInfo);
    });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={PostInfo.title ?? "잠시만 기다려주세요."}
          onChange={(e) => onChange(e)}
        />
        <div>
          <Form.Control
            type="file"
            className="shadow-none"
            accept="image/*"
            onChange={(e) => FileUpload(e)}
          />
        </div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          type="text"
          value={PostInfo.content ?? "잠시만 기다려주세요."}
          onChange={(e) => onChange(e)}
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
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            style={{ marginTop: "1rem" }}
          >
            취소
          </button>
        </UpoadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Edit;
