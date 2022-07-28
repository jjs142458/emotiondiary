import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={PostInfo.title}
          onChange={onChange}
        />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          type="text"
          value={PostInfo.content}
          onChange={onChange}
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
