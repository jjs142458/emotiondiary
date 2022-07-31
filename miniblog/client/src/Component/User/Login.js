import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Style/UesrCss";

function Login() {
  const [UserData, setUserData] = useState({
    Email: "",
    PW: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target.id, e.target.value);
    setUserData({
      ...UserData,
      [id]: value,
    });
  };

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
        <button>로그인</button>
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
