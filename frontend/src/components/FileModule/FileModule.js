import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from "axios";

const FileModule = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    getUploadedFiles();
  }, []);

  const getUploadedFiles = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/files",{
        headers:{
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmNjNzk2MTctNmM4MC00Y2JjLWI1MDctMzg5ZjhkNmFmZTA1MTY0ODMwNzQ2Mzc5MiIsImVtYWlsIjoidGVzdGVtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY0ODMwNzg3N30.em4F4DPLDxq18_CFLTDCK2Xln-mrwvlIMsYPtTQ-NQk"
        }
      });
      if (response.status === 200) {
        const data = response.data;
        setUploadedFiles(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const uploadFile = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.file.files[0];
      if (!file) {
        alert("Please select one file");
        return;
      }
  
      const formdata = new FormData();
      formdata.append("file", file);

      const response = await Axios.post("http://localhost:3001/upload", formdata, {
        "headers": {
          "Content-Type": "multipart/form-data",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmNjNzk2MTctNmM4MC00Y2JjLWI1MDctMzg5ZjhkNmFmZTA1MTY0ODMwNzQ2Mzc5MiIsImVtYWlsIjoidGVzdGVtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY0ODMwNzg3N30.em4F4DPLDxq18_CFLTDCK2Xln-mrwvlIMsYPtTQ-NQk"
        }
      });

      if (response.status === 200) {
        getUploadedFiles();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={uploadFile}>
        <input type="file" name="file" id="file" />

        <input type="submit" value="Submit" />
      </form>
      <h3>Uploaded files</h3>
      
      <table>
        <thead>
          <tr>
            <th>File name</th>
            <th>View file</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file) => {
            return (
              <tr>
                <td>{file.fileName}</td>
                <td>
                  <a
                    target="_blank"
                    href={`http://localhost:3001/view/${file.id}`}
                    rel="noreferrer"
                  >View</a>
                </td>
                <td><a
                    target="_blank"
                    href={`http://localhost:3001/download/${file.id}`}
                    rel="noreferrer"
                  >Download</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FileModule
