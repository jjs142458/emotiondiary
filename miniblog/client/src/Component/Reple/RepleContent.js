import React, { useState, useEffect, useRef } from "react";
import { RepleContentDiv, RepleUploadDiv } from "../../Style/RepleCSS";
import axios from "axios";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";

function RepleContent(props) {
  const user = useSelector((state) => state.user);
  const ref = useRef();
  const [ModalFalg, setModalFlag] = useState(false);
  const [EditFalg, setEditFalg] = useState(false);
  const [Reple, setReple] = useState("");
  useOnClickOutside(ref, () => setModalFlag(false));

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };

  const Submithandler = (e) => {
    e.preventDefault();

    let data = props.reple;
    data.reple = Reple;

    axios.put("/api/reple/edit", data).then((res) => {
      if (res.data.success) {
        setEditFalg(false);
      }
    });
  };

  const Deletehandler = (e) => {
    e.preventDefault();

    let data = props.reple._id;

    axios.delete("/api/reple/delete", { data: { data } }).then((res) => {
      if (res.data.success) {
        setEditFalg(false);
        setModalFlag(false);
      }
    });
  };

  return (
    <RepleContentDiv>
      <div className="author">
        <div className="userInfo">
          <Avatar
            size="30"
            round={true}
            src={props.reple.author.photoURL}
            style={{ border: "1px solid #c6c6c6" }}
          />
          <p>{props.reple.author.displayName}</p>
        </div>
        {props.reple.author.uid === user.uid && (
          <div className="modalControl">
            <span onClick={() => setModalFlag(true)}>...</span>
            {ModalFalg && props.reple.author.uid === user.uid && (
              <div className="modalDiv" ref={ref}>
                <p
                  onClick={() => {
                    setEditFalg(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
                <p className="delete" onClick={(e) => Deletehandler(e)}>
                  삭제
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="time">
        {SetTime(props.reple.createdAt, props.reple.updatedAt)}
      </p>
      {EditFalg ? (
        <RepleUploadDiv>
          <form>
            <input
              type="text"
              value={Reple}
              onChange={(e) => {
                setReple(e.target.value);
              }}
            />
            <button onClick={(e) => Submithandler(e)}>등록</button>
          </form>
          <div className="cancel">
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditFalg(false);
              }}
            >
              취소
            </button>
          </div>
        </RepleUploadDiv>
      ) : (
        <p>{props.reple.reple}</p>
      )}
    </RepleContentDiv>
  );

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
}

export default RepleContent;
