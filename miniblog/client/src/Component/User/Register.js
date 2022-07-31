import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Style/UesrCss";

import firebase from "../../firebase.js";
import axios from "axios";

function Register() {
  const [LoginData, setLoginData] = useState({
    name: "",
    Email: "",
    PW: "",
    PWC: "",
  });
  const [Flag, setFlag] = useState(false);

  const navigate = useNavigate();

  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(LoginData.name && LoginData.Email && LoginData.PW && LoginData.PWC)) {
      return alert("모든 값을 채워주세요");
    }
    if (LoginData.PW !== LoginData.PWC) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야합니다.");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(LoginData.Email, LoginData.PW);

    await createdUser.user.updateProfile({
      displayName: LoginData.name,
    });

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };
    console.log(body);
    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        alert("회원가입에 성공하셨습니다.");
        navigate("/login");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setLoginData({
      ...LoginData,
      [id]: value,
    });
  };

  return (
    <LoginDiv>
      <form>
        <label>이름</label>
        <input
          type="name"
          id="name"
          value={LoginData.name}
          onChange={onChange}
        />
        <label>이메일</label>
        <input
          type="email"
          id="Email"
          value={LoginData.Email}
          onChange={onChange}
        />
        <label>비밀번호</label>
        <input
          type="password"
          id="PW"
          value={LoginData.PW}
          minLength={8}
          onChange={onChange}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          id="PWC"
          value={LoginData.PWC}
          minLength={8}
          onChange={onChange}
        />
        <button disabled={Flag} onClick={(e) => RegisterFunc(e)}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
