import React, { useState, useEffect, useRef } from "react";
import { RepleContentDiv, RepleListDiv } from "../../Style/RepleCSS";
import axios from "axios";

function RepleContent(props) {
  const ref = useRef();
  const [ModalFalg, setModalFlag] = useState(false);
  const [EditFalg, setEditFalg] = useState(false);
  const [Reple, setReple] = useState("");
  useOnClickOutside(ref, () => setModalFlag(false));

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

    let data = props.reple.postId;

    axios.delete("/api/reple/delete", { data: { data } }).then((res) => {
      if (res.data.success) {
        setEditFalg(false);
      }
    });
  };

  return (
    <RepleContentDiv>
      <div className="author">
        <p>{props.reple.author.displayName}</p>
        <div className="modalControl">
          <span onClick={() => setModalFlag(true)}>...</span>
          {ModalFalg && (
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
      </div>
      {EditFalg ? (
        <RepleListDiv>
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
        </RepleListDiv>
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
