import styled from "@emotion/styled";

const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  miargin-botton: 1rem;
`;

const UploadForm = styled.form`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  input {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
  textarea {
    min-height: 350px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thum {
      background-color: gray;
      border-radius: 15px;
      background-colip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitsmoke;
    }
  }
  label {
    font-weight: bold;
    margin-top: 10px;
  }
`;

const UploadFormDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  input {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
  textarea {
    min-height: 350px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thum {
      background-color: gray;
      border-radius: 15px;
      background-colip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitsmoke;
    }
  }
  label {
    font-weight: bold;
    margin-top: 10px;
  }
`;

const UpoadButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    background: black;
    color: white;
    border: 1px solid black;
    &: hover {
      background: white;
      color: black;
      border: 1px solid black;
    }
  }
`;

export { UploadDiv, UploadForm, UpoadButtonDiv, UploadFormDiv };
