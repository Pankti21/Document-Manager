import React from "react";
import Container from "react-bootstrap/Container";
import { Badge, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewGroup = () => {
    const param = useParams();

    let history = useHistory();

    const getGroupFilesAPI = `http://localhost:3001/files`;
    const getGroupUsersAPI = `http://localhost:3001/getgroupusers/${param.id}`;

    const [fileDetails, setFileDetails] = useState([]);
    const [groupUsers, setGroupUsers] = useState([]);

    const addMemberHandler = (event) => {
        history.push(`/addmember/${param.id}`);
    };

    const removeMemberHandler = (event) => {
        history.push(`/removemember/${param.id}`);
    };

    const getUrl = async (event) => {
        const getFileUrl = `http://localhost:3001/geturl/${param.id}/${event.target.value}`;

        axios
            .get(getFileUrl, {
                headers: {},
            })
            .then((res) => {
                //console.log("Res: " + JSON.stringify(res));
                console.log("Res: " + res.data.message);

                Swal.fire({
                    icon: "info",
                    title: "Your shortened URL is below:",
                    text: res.data.message,
                });
            })
            .catch((err) => {
                console.log("Err", err);
            });
    };

    const shortenUrl = async (event) => {
        const getFileUrl = `http://localhost:3001/geturl/${param.id}/${event.target.value}`;

        const response = await axios.get(getFileUrl, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmNjNzk2MTctNmM4MC00Y2JjLWI1MDctMzg5ZjhkNmFmZTA1MTY0ODMwNzQ2Mzc5MiIsImVtYWlsIjoidGVzdGVtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY0ODMwNzg3N30.em4F4DPLDxq18_CFLTDCK2Xln-mrwvlIMsYPtTQ-NQk",
            },
        });

        //console.log(response.data.message);

        const fileUrl = response.data.message;

        //const response2 = await axios.post("http://localhost:9000/shorten", {url: fileUrl}, {});

        console.log("url: ", fileUrl);

        axios
            .post(
                "http://localhost:9000/shorten",
                {
                    url: fileUrl,
                },
                {
                    headers: {},
                }
            )
            .then((res) => {
                //console.log("Res: " + JSON.stringify(res));
                //console.log("Res: " + res.data);

                Swal.fire({
                    icon: "info",
                    title: "Your shortened URL is below:",
                    text: res.data,
                });
            })
            .catch((err) => {
                console.log("Err", err);
            });
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        try {
            console.log(param.id);
            const file = e.target.file.files[0];
            if (!file) {
                alert("Please select one file");
                return;
            }

            const formdata = new FormData();
            formdata.append("file", file);
            formdata.append("groupId", param.id);
            //console.log("file:", formdata.files);
            //console.log(formdata);
            const response = await axios.post("/upload", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token":
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmNjNzk2MTctNmM4MC00Y2JjLWI1MDctMzg5ZjhkNmFmZTA1MTY0ODMwNzQ2Mzc5MiIsImVtYWlsIjoidGVzdGVtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY0ODMwNzg3N30.em4F4DPLDxq18_CFLTDCK2Xln-mrwvlIMsYPtTQ-NQk",
                },
            });

            if (response.status === 200) {
                getUploadedFiles();
                console.log("success");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUploadedFiles = () => {
        axios.post(getGroupFilesAPI, {
            groupId: param.id
        }).then((res) => {
            console.log(res.data);
            setFileDetails(res.data.map((ele) => ({ file_name: ele.fileName, file_id: ele.id })));
            console.log("FD: ", fileDetails);
        });

        axios.get(getGroupUsersAPI).then((res) => {
            console.log(res.data);
            setGroupUsers(res.data);
        });
    }

    useEffect(() => {
        getUploadedFiles();
    }, []);


    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <h1 className="col-12 m-4">Group Files</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>File name</th>
                                <th>View file</th>
                                <th>Download File</th>
                                <th>Get URL</th>
                                <th>Get Shorten URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileDetails.map((file) => {
                                return (
                                    <tr>
                                        <td>{file.file_name}</td>
                                        <td>
                                            <a target="_blank"
                                                href={`http://localhost:3001/view/${param.id}/${file.file_id}`}
                                                rel="noreferrer">
                                                {" "}
                                                <Button variant="secondary">View</Button>{" "}
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank"
                                                href={`http://localhost:3001/download/${param.id}/${file.file_id}`}
                                                rel="noreferrer">
                                                {" "}
                                                <Button variant="secondary">Download</Button>{" "}
                                            </a>
                                        </td>
                                        <td>
                                            {/* <a target="_blank" href={`http://localhost:3001/geturl/${param.id}/${file.file_id}`} rel="noreferrer"> */}{" "}
                                            <Button variant="secondary" value={`${file.file_id}`} onClick={getUrl}>
                                                URL
                                            </Button>{" "}
                                            {/* </a> */}
                                        </td>
                                        <td>
                                            {/* <a target="_blank" href={`http://localhost:9000/shorten/${param.id}/${file.file_id}`} rel="noreferrer"> */}{" "}
                                            <Button variant="secondary" value={`${file.file_id}`} onClick={shortenUrl}>
                                                Shorten URL
                                            </Button>{" "}
                                            {/* </a> */}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Form onSubmit={uploadFile}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>File Upload</Form.Label>
                            <Form.Control type="file" id="file" name="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control type="submit" value="Submit"
                                style={{ backgroundColor: "blue", color: "white", maxWidth: "10%" }} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col
                    style={{
                        borderLeft: "2px solid navy",
                        marginLeft: "0px",
                    }}
                >
                    <h1 className="col-12 m-4">Group members</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>User name</th>
                                <th>User id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupUsers.map((user) => {
                                return (
                                    <tr>
                                        <td>{user.user_name}</td>
                                        <td>{user.user_id}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Button style={{ marginRight: "10px" }} onClick={addMemberHandler}>
                        Add member
                    </Button>
                    <Button onClick={removeMemberHandler}>Remove member</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewGroup;
