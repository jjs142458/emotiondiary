import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Style/UesrCss";

import { useSelector } from "react-redux";
import firebase from "../../firebase.js";
import axios from "axios";

function Register() {
  const [LoginData, setLoginData] = useState({
    name: "",
    Email: "",
    PW: "",
    PWC: "",
  });
  const user = useSelector((state) => state.user);
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.accessToken) {
      navigate("/", { replace: true });
    }
  }, []);

  const RegisterFunc = async (e) => {
    e.preventDefault();
    if (!(LoginData.name && LoginData.Email && LoginData.PW && LoginData.PWC)) {
      return alert("모든 값을 채워주세요");
    }
    if (LoginData.PW !== LoginData.PWC) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야합니다.");
    }
    if (!NameCheck) {
      return alert("중복 검사를 진행해주세요.");
    }
    setFlag(true);
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(LoginData.Email, LoginData.PW);

    await createdUser.user.updateProfile({
      displayName: LoginData.name,
      photoURL:
        "https://kr.object.ncloudstorage.com/blog-community/user/profile.gif",
    });

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL:
        "https://kr.object.ncloudstorage.com/blog-community/user/profile.gif",
    };

    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        alert("회원가입에 성공하셨습니다.");
        alert("로그인 되었습니다.");
        navigate("/");
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

  const NameCheckFunc = (e) => {
    e.preventDefault();
    if (!LoginData.name) {
      return alert("닉네임을 입력해주세요.");
    }

    let body = {
      displayName: LoginData.name,
    };
    axios.post("/api/user/namecheck", body).then((res) => {
      if (res.data.check) {
        setNameCheck(true);
        setNameInfo("사용가능한 닉네임입니다.");
      } else {
        setNameInfo(
          <div style={{ color: "red" }}>사용불가능한 닉네임입니다.</div>
        );
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label>닉네임</label>
        <input
          type="name"
          id="name"
          value={LoginData.name}
          onChange={onChange}
        />
        {NameInfo}
        <button onClick={(e) => NameCheckFunc(e)}>중복검사</button>
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
