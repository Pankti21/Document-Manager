import React, { useEffect, useState } from "react";
import { FormSelect, Spinner, Alert, ListGroup, Card, ListGroupItem } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";

const FileTranslate = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [languageCode, setLanguageCode] = useState(null);
  const [originalAndTranslatedText, setOriginalAndTranslatedText] = useState([]);

  // call the translate api when language code is updated
  const callTranslateAPI = (id, targetLanguageCode) => {
    setIsLoading(true);
    Axios.post(`http://localhost:3001/translate/${params.groupId}/${id}`, {
      targetLanguageCode
    })
      .then((response) => {
        setOriginalAndTranslatedText(response.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setIsLoading(false);
      });
  };

  const updateLanguageCode = (e) => {
    setLanguageCode(e.target.value);
    callTranslateAPI(params.fileId, e.target.value);
  }

  // render state when selecting target language
  if (languageCode === null) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "60%",
          flexFlow: "column",
          gap: "32px"
        }}
      className="container">
        <h1>Select the target language</h1>
        <FormSelect onChange={updateLanguageCode}>
          <option value="0">Select a language</option>
          <option value="gu">Gujarati</option>
          <option value="hi">Hindi</option>
          <option value="ar">Arabic</option>
        </FormSelect>
      </div>
    )
  }

  // render state when loading
  if (isLoading) {
    return (
      <div
        className="container"
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>

        <h3>Translating...</h3>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="container"
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Alert variant="danger">
          <Alert.Heading>Failed to load data</Alert.Heading>
          <p>The request failed while translating your file. You can <a href={`/files/translate/${params.fileId}`}>try again</a>.</p>
        </Alert>
      </div>
    )
  }

  // render state when showing the translated content in file
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        flexFlow: "column",
        padding: "64px",
        gap: "32px"
      }}
    >
      <h1>Your translated data</h1>

      <Card
        className="original-list-group"
        style={{
          display: "flex"
        }}
      >
        <ListGroup variant="flush">
          {originalAndTranslatedText.map((listItem, index) => {
            return (
              <ListGroupItem key={index}>
                <p style={{ margin: "0px" }}><b>{listItem.text}</b></p>
                <p style={{ margin: "0px" }}>{listItem.translatedText}</p>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </Card>
    </div>
  )
}

export default FileTranslate;
