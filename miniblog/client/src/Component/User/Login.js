import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Style/UesrCss";

import firebase from "../../firebase.js";

import { useSelector } from "react-redux";

function Login() {
  const user = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const [UserData, setUserData] = useState({
    Email: "",
    PW: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user.accessToken) {
      alert("잘못된 경로입니다.");
      navigate("/", { replace: true });
    }
  }, []);

  const SignInFunc = async (e) => {
    e.preventDefault();
    if (!(UserData.Email && UserData.PW)) {
      return alert("모든 값을 채워주세요.");
    }
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(UserData.Email, UserData.PW);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrMsg("존재하지 않는 이메일 입니다.");
      } else if (err.code === "auth/wrong-password") {
        setErrMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setErrMsg("로그인에 실패하였습니다.");
      }
    }
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...UserData,
      [id]: value,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 5000);
  }, [errMsg]);

  return (
    <LoginDiv>
      <form>
        <label>이메일</label>
        <input
          id="Email"
          type="email"
          value={UserData.Email}
          onChange={(e) => onChange(e)}
        />
        <label>비밀번호</label>
        <input
          id="PW"
          type="password"
          value={UserData.PW}
          onChange={(e) => onChange(e)}
        />
        {errMsg !== " " && <p>{errMsg}</p>}
        <button onClick={(e) => SignInFunc(e)}>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
