import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import firebase from "./firebase.js";

import "./App.css";
import Heading from "./Component/Heading";
import Upload from "./Component/Post/Upload";
import List from "./Component/Post/List";
import PostArea from "./Component/Post/PostArea.js";
import Edit from "./Component/Post/Edit";

import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import MyPage from "./Component/User/MyPage";

import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";

function App() {
  const dispathch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispathch(loginUser(userInfo.multiFactor.user));
      } else {
        dispathch(clearUser());
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:postNum" element={<PostArea />} />
          <Route path="/edit/:postNum" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
