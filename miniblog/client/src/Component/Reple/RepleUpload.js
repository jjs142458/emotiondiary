import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RepleUploadDiv } from "../../Style/RepleCSS.js";

function RepleUpload(props) {
  const [Reple, setReple] = useState("");
  const [Posting, setPosting] = useState(false);
  const user = useSelector((state) => state.user);

  const Submithandler = (e) => {
    e.preventDefault();
    setPosting(true);
    if (!Reple) {
      setPosting(false);
      return alert("댓글 내용을 입력해주세요.");
    }

    let body = {
      reple: Reple,
      uid: user.uid,
      postId: props.postId,
    };
    axios.post("/api/reple/submit", body).then((res) => {
      if (res.data.success) {
        setReple("");
        alert("댓글 작성이 완료되었습니다.");
        //window.location.reload();
        setPosting(false);
      } else {
        alert("댓글 작성에 실패하였습니다.");
      }
    });
  };
  return (
    <RepleUploadDiv>
      <form>
        <input
          type="text"
          value={Reple}
          disabled={Posting}
          onChange={(e) => setReple(e.target.value)}
        />
        <button onClick={(e) => Submithandler(e)} disabled={Posting}>
          등록
        </button>
      </form>
    </RepleUploadDiv>
  );
}

export default RepleUpload;
