import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Heading from "./Component/Heading";
import Upload from "./Component/Post/Upload";
import List from "./Component/Post/List";

function App() {
  const [ContentList, setContentList] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route
            path="/"
            element={
              <List ContentList={ContentList} setContentList={setContentList} />
            }
          />
          <Route
            path="/upload"
            element={
              <Upload
                ContentList={ContentList}
                setContentList={setContentList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
