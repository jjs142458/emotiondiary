import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RepleListDiv } from "../../Style/RepleCSS";

function RepleUpload(props) {
  const [Reple, setReple] = useState("");
  const user = useSelector((state) => state.user);

  const Submithandler = (e) => {
    e.preventDefault();

    if (!Reple) {
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
      } else {
        alert("댓글 작성에 실패하였습니다.");
      }
    });
  };
  return (
    <RepleListDiv>
      <form>
        <input
          type="text"
          value={Reple}
          onChange={(e) => setReple(e.target.value)}
        />
        <button onClick={(e) => Submithandler(e)}>등록</button>
      </form>
    </RepleListDiv>
  );
}

export default RepleUpload;
