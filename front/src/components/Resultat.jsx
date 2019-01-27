import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import questions from "./questions";
import { Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { urlBackEnd } from "../conf";
import "./css/Resultat.css";

const ResultBar = props => {
  return (
    <React.Fragment>
      <Col
        lg={{ size: 6 }}
        className="d-flex bidule justify-content-center mt-5"
      >
        <Col
          xs={{ size: 12 }}
          className="mb-5 pb-5 pr-5 px-0 bg-light"
          id={props.number}
        >
          <Col xs={{ size: 12 }} className="componentTitle my-4 px-5">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="px-0">
            <Row id={props.number}>
              {props.possibilities.map(data => (
                <React.Fragment key={data}>
                  <Col xs={{ size: 4 }} className="pt-2 pr-0 alignCenter">
                    <Col xs={{ size: 12 }} className="textAlignRight pr-1">
                      {data}
                    </Col>
                  </Col>
                  <Col xs={{ size: 7 }} className="borderLeft pt-2 px-0">
                    <Col
                      xs={{ size: 12 }}
                      className="px-0 alignCenterFullHeight"
                    >
                      <div
                        className="bg-dark text-white"
                        style={{
                          width:
                            100 /
                              (props.dataFetch.length /
                                props.dataFetch.filter(
                                  dataFetch => dataFetch[props.index] === data
                                ).length) +
                            "%",
                          display: "flex",
                          height: "3vh",

                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden"
                        }}
                      >
                        {100 /
                          (props.dataFetch.length /
                            props.dataFetch.filter(
                              dataFetch => dataFetch[props.index] === data
                            ).length) +
                          "%"}
                      </div>
                    </Col>
                  </Col>
                </React.Fragment>
              ))}
              <Col
                xs={{ size: 7, offset: 4 }}
                className="px-0 containerResultBar"
              >
                <Col xs={{ size: 12 }} className="d-flex px-0 pt-2">
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                </Col>
              </Col>
              <Col xs={{ size: 7, offset: 4 }} className="d-flex px-0">
                <Col xs={{ size: 1 }} className="px-1 d-flex">
                  0%
                </Col>
                <Col xs={{ size: 4 }}>25%</Col>
                <Col xs={{ size: 2 }}>50%</Col>
                <Col xs={{ size: 4 }}>75%</Col>
                <Col xs={{ size: 1 }} className="px-1 textAlignRight">
                  100%
                </Col>
              </Col>
            </Row>
          </Col>
        </Col>
      </Col>
    </React.Fragment>
  );
};

const ResultPie = props => {
  let possibilities = [];
  props.possibilities.map(data => possibilities.push(data));
  possibilities.push("------");

  let pies = { pie1: [], pie2: [], pie3: [] };
  possibilities.map(data =>
    pies.pie1.push(
      props.dataFetch.filter(state => state[props.index + "one"] === data)
        .length
    )
  );
  possibilities.map(data =>
    pies.pie2.push(
      props.dataFetch.filter(state => state[props.index + "two"] === data)
        .length
    )
  );

  possibilities.map(data =>
    pies.pie3.push(
      props.dataFetch.filter(state => state[props.index + "three"] === data)
        .length
    )
  );

  let tabName = [];
  props.possibilities.map(data => tabName.push(data));
  tabName.push("Aucun");

  let color = [
    "#aad7a9",
    "#348b54",
    "#3cd74b",
    "#fd62d9",
    "#cda889",
    "#bfb1e5",
    "#c5eff2",
    "#3bf859",
    "#5f8a01",
    "#b604cf",
    "#66354f"
  ];
  const data = [
    {
      labels: tabName,
      datasets: [
        {
          data: pies.pie1,
          backgroundColor: color
        }
      ]
    },
    {
      labels: tabName,
      datasets: [
        {
          data: pies.pie2,
          backgroundColor: color
        }
      ]
    },
    {
      labels: tabName,
      datasets: [
        {
          data: pies.pie3,
          backgroundColor: color
        }
      ]
    }
  ];

  const options = [
    {
      title: {
        display: true,
        text: "Priorité 1.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        display: false
      }
    },
    {
      title: {
        display: true,
        text: "Priorité 2.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        display: false
      }
    },
    {
      title: {
        display: true,
        text: "Priorité 3.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        display: false
      }
    }
  ];

  let idTab = 0;
  return (
    <Col lg={{ size: 6 }} className="d-flex justify-content-center mt-5">
      <Col
        xs={{ size: 12 }}
        className="mb-5 pb-5 pr-5 px-0 bg-light"
        id={props.number}
      >
        <Col xs={{ size: 12 }} className="componentTitle my-4 px-5">
          {props.label}
        </Col>
        <Row id={props.number}>
          <Col xs={{ size: 8 }}>
            {tabName.map(data => {
              idTab += 1;

              return (
                <Col lg={{ size: 12 }} key={idTab}>
                  <Col xs={{ size: 12 }} className="d-flex my-1">
                    <Col xs={{ size: 4 }} className="centerRight">
                      <Col
                        xs={{ size: 8 }}
                        className="border colorLegend"
                        style={{
                          height: "3vh",
                          backgroundColor: color[idTab - 1]
                        }}
                      >
                        {" "}
                      </Col>
                    </Col>
                    <Col xs={{ size: 8 }} className="textAlignLeft">
                      {data}
                    </Col>
                  </Col>
                </Col>
              );
            })}
          </Col>
          <Col xs={{ size: 4 }}>
            <Col lg={{ size: 12 }}>
              <Pie
                data={data[0]}
                options={options[0]}
                width={100}
                height={100}
              />
            </Col>
            <Col lg={{ size: 12 }}>
              <Pie
                data={data[1]}
                options={options[1]}
                width={100}
                height={100}
              />
            </Col>
            <Col lg={{ size: 12 }}>
              <Pie
                data={data[2]}
                options={options[2]}
                width={100}
                height={100}
              />
            </Col>
          </Col>
        </Row>
      </Col>
    </Col>
  );
};

const ResultText = props => {
  let result = 0;

  props.dataFetch.map(data => {
    result += data[props.index];
    return false;
  });
  result = (result / props.dataFetch.length).toFixed(2);

  return (
    <React.Fragment>
      <Col xs={{ size: 9 }} className="mb-5 pb-5 bg-light" id={props.number}>
        <Col xs={{ size: 12 }} className="my-5 componentTitle">
          {props.label}
        </Col>
        <Col
          xs={{ size: 12 }}
          className="d-flex justify-content-center contentResultText"
          id={props.number}
        >
          La moyenne des salariés ayant répondu est de{" "}
          <span className="dataResultText">
            {result}
            {props.symbol}
          </span>
        </Col>
      </Col>
    </React.Fragment>
  );
};

class Resultat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: true,
      dataFetch: [],
      nbResponse: 0,
      loadingPdf: false
    };
  }

  handlePdf() {
    /* This is another method to extract this page in pdf. It's not
        a recursive method and there is no way a possibility to generate a infinite loop. */
    this.setState({
      loadingPdf: true
    });
    const pdf = new jsPDF();
    let i = 0;
    pdf.text(15, 15, "Résultat de votre enquête :");

    questions
      .filter(question => question.type !== "text")
      .map(question => {
        let input = document.getElementById(question.number);
        html2canvas(input).then(canvas => {
          let imgData = canvas.toDataURL("image/png");
          pdf.addImage(
            imgData,
            "PNG",
            question.coordinateImg[0],
            question.coordinateImg[1],
            question.coordinateImg[2],
            question.coordinateImg[3]
          );
          if (question.pageAdded === true) {
            pdf.addPage();
          }
          i++;
          if (
            i >= questions.filter(question => question.type !== "text").length
          ) {
            pdf.save("resultat-enquete.pdf");
            this.setState({
              loadingPdf: false
            });
          }
        });
        return false;
      });
  }

  handleBack = event => {
    event.preventDefault();
    this.props.history.push("/listeenquetesrh");
  };

  componentDidMount() {
    this.getResult();
    const token = localStorage.getItem("token");
    const body = {
      survey_name: this.props.location.state.surveyNameSelected
    };
    axios
      .post(`${urlBackEnd}/user/answers`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(result => {
        let hasAnswered = result.data[0].nb_response;
        this.setState({
          nbResponse: hasAnswered
        });
      });
  }

  getResult = () => {
    try {
      if (
        !this.props.location.state.currentId &&
        !this.props.location.state.surveyNameSelected
      ) {
        this.props.history.push("/monespace");
      }
    } catch {
      this.props.history.push("/monespace");
    }
    const token = localStorage.getItem("token");
    fetch(`${urlBackEnd}/user/resultat`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(results => results.json())
      .then(data => {
        let dataFetch = data.filter(
          survey =>
            survey.id_rh === this.props.location.state.currentId &&
            survey.survey_name === this.props.location.state.surveyNameSelected
          //add the date true
        );
        this.setState({
          dataFetch: dataFetch,
          hovering: true
        });
      });
  };

  render() {
    return (
      <div className="container-fluid mt-2">
        <div className="col-1 offset-11 mb-2">
          <button
            className="btn goTop text-white"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <i className="fa fa-arrow-up" />
          </button>
        </div>
        <Row>
          <Col lg={{ size: 2 }} className="pb-4">
            <button className="mt-2 btn text-white" onClick={this.handleBack}>
              <i className="fa fa-arrow-left" /> Précédent
            </button>
          </Col>
          <Col lg={{ size: 8 }}>
            <h1 className="text-white">
              <b>Consulter les résultats de mon enquête</b>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 12 }} className="contentTotalResult mt-5">
            <b>{this.state.nbResponse}</b> salarié(s) ayant répondu au sondage
            pour l'instant.
          </Col>
        </Row>
        <Row className="px-5 mt-5 d-flex justify-content-center">
          {questions.map(data => {
            switch (data.type) {
              case "option":
                return (
                  <ResultBar
                    hovering={this.state.hovering}
                    possibilities={data.possibilities}
                    index={data.index}
                    dataFetch={this.state.dataFetch}
                    label={data.label}
                    number={data.number}
                    key={data.id}
                  />
                );
              case "multipleOption":
                return (
                  <ResultPie
                    possibilities={data.possibilities}
                    index={data.index}
                    dataFetch={this.state.dataFetch}
                    label={data.label}
                    number={data.number}
                    key={data.id}
                  />
                );
              case "number":
                return (
                  <ResultText
                    possibilities={data.possibilities}
                    index={data.index}
                    dataFetch={this.state.dataFetch}
                    label={data.label}
                    number={data.number}
                    symbol={data.symbol}
                    key={data.id}
                  />
                );
              default:
                return false;
            }
          })}
        </Row>
        <Row>
          <Col xs={{ size: 12 }} className="pb-5 mt-5">
            <button
              onClick={() => this.handlePdf()}
              className="mb-4 mt-3 btn btn-lg text-white pdfButton"
            >
              <i className="fa fa-file-pdf-o" /> Télécharger PDF
            </button>
            {this.state.loadingPdf && (
              <img
                className="spinnerResultat"
                alt="spinner"
                src="img/Spinner.gif"
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Resultat;
