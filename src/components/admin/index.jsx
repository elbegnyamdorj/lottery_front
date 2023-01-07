import React, { Component } from "react";
import axios from "axios";
import { postLotteryList } from "../../urls";
import { deleteLotteryList } from "../../urls";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Spinner } from "react-bootstrap";

class Admin extends Component {
  state = {
    selectedFile: null,
    isLoading: false,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    if (this.state.selectedFile) {
      this.setState({ isLoading: true });
      const formData = new FormData();
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios.post(postLotteryList, formData).then((res) => {
        const response = res.data;
        if (response.status === "success") {
          this.setState({ isLoading: false });
          this.setState({ selectedFile: null });
          alert("Successfully uploaded");
        }
      });
    }
  };

  onDelete = () => {
    if (window.confirm("Бүх сугаланы мэдээллийг устгах уу?")) {
      axios.delete(deleteLotteryList).then((res) => {
        const response = res.data;
        if (response.status === "success") {
          alert("Амжилттай устгагдлаа");
        }
      });
    }
  };

  render() {
    var loader,
      buttonLabel = "Upload",
      isDisabled = false;
    if (this.state.isLoading) {
      loader = "";
      buttonLabel = "Uploading";
      isDisabled = true;
    } else {
      loader = "none";
      buttonLabel = "Upload";
      isDisabled = false;
    }
    return (
      <div>
        <div>
          <Container className="pd-5">
            <Row className="show-grid">
              <Form.Label>Сугалааны CSV файл оруулна уу</Form.Label>
              <Col xs={1} md={6}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    required
                    type="file"
                    onChange={this.onFileChange}
                    accept=".csv"
                  />
                </Form.Group>
              </Col>
              <Col xs={4} md={6}>
                <Button onClick={this.onFileUpload} disabled={isDisabled}>
                  <Spinner
                    style={{ display: loader }}
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {buttonLabel}
                </Button>
              </Col>
            </Row>
            <Row>
              <Form.Label>Сугалааны дугаар шалгах орон</Form.Label>
              <Col xs={4} md={3}>
                <Form.Group className="mb-3">
                  <Form.Control
                    defaultValue={this.props.count}
                    type="text"
                    onChange={this.props.onSearch}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="danger" onClick={this.onDelete}>
              Сугалаануудыг устгах
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}

export default Admin;
