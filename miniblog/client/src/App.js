import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Heading from "./Component/Heading";
import Upload from "./Component/Post/Upload";
import List from "./Component/Post/List";
import Detail from "./Component/Post/Detail";
import Edit from "./Component/Post/Edit";

import Login from "./Component/User/Login";
import Register from "./Component/User/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:postNum" element={<Detail />} />
          <Route path="/edit/:postNum" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
