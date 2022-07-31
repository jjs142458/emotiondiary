import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

function ImageUpload(props) {
  const FileUpload = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files);
    axios.post("/api/post/image/upload", formData).then((res) => {
      console.log(res);
      props.setImage(res.data.filePath);
    });
  };

  return (
    <div>
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
}

export default ImageUpload;
