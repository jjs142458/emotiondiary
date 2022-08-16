import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
import firebase from "../../firebase";
import { MyPageDiv } from "../../Style/UserCSS.js";

function MyPage() {
  const [CurrentImage, setCurrentImage] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      navigate("/login");
    } else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  const ImageUpload = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files);
    axios.post("/api/user/profile/image", formData).then((res) => {
      setCurrentImage(res.data.filePath);
    });
  };

  const SaveProfile = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: CurrentImage,
      });
    } catch (err) {
      return alert("프로필 설정에 실패하였습니다.");
    }
    let body = {
      photoURL: CurrentImage,
      uid: user.uid,
    };
    axios.put("/api/user/profile/update", body).then((res) => {
      if (res.data.success) {
        alert("프로필 설정에 성공하였습니다.");
        window.location.reload();
      } else {
        return alert("프로필 설정에 실패하였습니다.");
      }
    });
  };

  return (
    <MyPageDiv style={{ width: "100vw", height: "100vh" }}>
      <form
        style={{
          width: "50%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <label>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => ImageUpload(e)}
          />
          <Avatar
            size="100"
            round={true}
            src={CurrentImage}
            style={{ cursor: "pointer" }}
          />
        </label>
        <button onClick={(e) => SaveProfile(e)}>저장</button>
      </form>
    </MyPageDiv>
  );
}

export default MyPage;
