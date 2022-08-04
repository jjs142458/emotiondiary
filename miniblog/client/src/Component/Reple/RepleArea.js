import React from "react";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";
import { useSelector } from "react-redux";
import { RepleAreaDiv } from "../../Style/RepleCSS";

function RepleArea(props) {
  const user = useSelector((state) => state.user);
  return (
    <RepleAreaDiv>
      {user.accessToken && <RepleUpload postId={props.postId} />}
      <RepleList postId={props.postId} />
    </RepleAreaDiv>
  );
}

export default RepleArea;
