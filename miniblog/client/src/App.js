import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Heading from "./Component/Heading";
import Upload from "./Component/Post/Upload";
import List from "./Component/Post/List";
import Detail from "./Component/Post/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:postNum" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
