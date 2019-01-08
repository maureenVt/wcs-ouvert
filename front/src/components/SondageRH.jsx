import React, { Component } from "react";
import questions from "./questions";
import "./css/SondageRH.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import axios from "axios";

const MultipleOption = props => {
  return (
    <React.Fragment>
      <br />
      <div className="">
        <label className="m-2" htmlFor={props.data.id}>
          {props.data.number}) {props.data.label}
        </label>
        <div className="m-3">
          <div className="">
            <span>1.</span>
            <select id={props.data.id} className="">
              {props.data.possibilities.map(content => {
                return <option key={content}>{content}</option>;
              })}
            </select>
          </div>
          <div className="">
            <span>2.</span>
            <select id={props.data.id} className="">
              <option>------</option>
              {props.data.possibilities.map(content => {
                return <option key={content}>{content}</option>;
              })}
            </select>
          </div>
          <div className="">
            <span>3.</span>
            <select id={props.data.id} className="">
              <option>------</option>
              {props.data.possibilities.map(content => {
                return <option key={content}>{content}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Text = props => {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor={props.data.id}>
        {props.data.number}) {props.data.label}
      </label>
      <br />
      <textarea className="surveyTextArea" />
      <p />
    </React.Fragment>
  );
};

const Option = props => {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor={props.data.id}>
        {props.data.number}) {props.data.label}
      </label>
      <br />
      <select className="m-4" id={props.data.id}>
        {props.data.possibilities.map(content => {
          return <option key={content}>{content}</option>;
        })}
      </select>
      <p />
    </React.Fragment>
  );
};

const Number = props => {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor={props.data.id}>
        {props.data.number}) {props.data.label}
      </label>
      <br />
      <input className="m-4" placeholder="0" type="number" id={props.data.id} />
      <br />
    </React.Fragment>
  );
};

class SondageRH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isSend: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/nouvelleenquete");
  };

  sendMails = () => {
    let body = { mails: this.props.location.state.mailsData };
    axios({
      method: "post",
      url: "http://localhost:8080/rh/send/survey",
      data: body
    })
      .then(res => {
        console.log(res);
        this.setState({
          modal: false,
          isSend: true
        });
      })
      .catch(error => {
        console.log("Fail: " + error);
      });
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    return (
      <div>
        <hr />
        <div>
          <Container className="mt-4">
            <Row>
              <Col lg={{ size: 2 }}>
                <button
                  className="mt-2 btn text-white"
                  onClick={this.handleSubmit}
                >
                  <i className="fa fa-chevron-left" /> Précédent
                </button>
              </Col>
              <Col lg={{ size: 8 }}>
                <h3>Consulter et diffuser l'enquête à mes salariés</h3>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 12 }}>
                <div className="card shadow mt-5">
                  <div className="surveyCard p-3">
                    {questions.map(data => {
                      switch (data.type) {
                        case "option":
                          return <Option key={data.id} data={data} />;
                        case "number":
                          return <Number key={data.id} data={data} />;
                        case "multipleOption":
                          return <MultipleOption key={data.id} data={data} />;
                        case "text":
                          return <Text key={data.id} data={data} />;
                        default:
                          return <p>Il y a une erreur.</p>;
                      }
                    })}
                  </div>
                </div>
              </Col>
            </Row>
            <Container className="mt-4">
              <Row>
                <Col lg={{ size: 8, offset: 2 }}>
                  <p>
                    Si vous souhaitez ajouter des questions à cette enquête,
                    nous vous invitons à contacter l'assistance.
                  </p>
                </Col>
              </Row>
            </Container>
            <Row>
              {this.state.isSend === false ? (
                <Col lg={{ size: 6, offset: 3 }}>
                  <button className="btn text-white m-3" onClick={this.toggle}>
                    <i className="fa fa-envelope-o" /> Diffuser l'enquête
                  </button>
                </Col>
              ) : (
                <Col lg={{ size: 8, offset: 2 }}>
                  <p className="mt-2 mb-2 confirmationMsg">
                    Le sondage a bien été envoyé à votre liste. Vous devez
                    attendre la date de fin indiquée lors de la création de
                    l'enquête pour obtenir les résultats.
                  </p>
                  <button
                    className="btn text-white mb-4"
                    onClick={() => {
                      this.props.history.push("/monespace");
                    }}
                  >
                    <i className="fa fa-home" /> Revenir à l'accueil
                  </button>
                </Col>
              )}

              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className=""
              >
                <ModalHeader
                  toggle={this.toggle}
                  close={closeBtn}
                  className="modalHeader"
                >
                  {" "}
                  Confirmer la diffusion{" "}
                </ModalHeader>
                <ModalBody className="movieModal">
                  <h6>Souhaitez-vous diffuser l'enquête ?</h6>
                  <br />
                  <p>
                    Suite à votre fichier enregistré dans l'étape précédente,{" "}
                    {this.props.location.state.nbMails > 1
                      ? `${
                          this.props.location.state.nbMails
                        } e-mails seront envoyés.`
                      : `${
                          this.props.location.state.nbMails
                        } e-mail sera envoyé.`}
                  </p>
                </ModalBody>
                <ModalFooter className="movieModal">
                  <Button
                    onClick={() => {
                      this.sendMails();
                    }}
                    className="btn-success text-white"
                  >
                    Oui je confirme
                  </Button>
                  <Button onClick={this.toggle} className="bg-dark text-white">
                    Non
                  </Button>
                </ModalFooter>
              </Modal>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default SondageRH;
