import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Sondage.css";

const Option = props => {
  return (
    <React.Fragment>
      <label for={props.data.id}>{props.data.label}</label>
      <br />
      <select id={props.data.id} onChange={props.function}>
        {props.data.possibilities.map(content => {
          return <option>{content}</option>;
        })}
      </select>
      <p />
    </React.Fragment>
  );
};

const Checkbox = props => {
  return (
    <React.Fragment>
      <label for={props.data.id}>{props.data.label}</label>
      <br />
      {props.data.possibilities.map(content => {
        return (
          <div>
            <span>{content} </span>
            <input
              type="checkbox"
              id={props.data.id}
              name={content}
              onChange={props.function}
            />
          </div>
        );
      })}
      <p />
    </React.Fragment>
  );
};

const Number = props => {
  return (
    <React.Fragment>
      <label for={props.data.id}>{props.data.label}</label>
      <br />
      {props.data.possibilities.map(content => {
        return (
          <div>
            <span>{content} </span>
            <br />
            <input
              type="number"
              id={props.data.id}
              name={content}
              onChange={props.function}
            />
          </div>
        );
      })}
      <p />
    </React.Fragment>
  );
};

class Sondage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: "generalTransport",
          type: "option",
          label:
            "De manière générale, pour vos déplacements domicile-travail, utilisez-vous : ",
          possibilities: [
            "un seul mode de transport",
            "plusieurs modes de transport successivement dans un même trajet"
          ]
        },
        {
          id: "oneTransport",
          type: "option",
          label:
            "Quel est votre mode de transport habituel votre trajet domicile-travail ?",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train (RER,…)",
            "Métro",
            "Bus",
            "Tramway",
            "Deux roues non motorisées dit transport doux (vélo, trottinette, roller...)",
            "Deux roues motorisées (moto, scooter)",
            "Marche à pied (ou course)",
            "Autre"
          ]
        },
        {
          id: "severalTransport",
          type: "checkbox",
          label: "Dans quel ordre les utilisez-vous ?",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train (RER,…)",
            "Métro",
            "Bus",
            "Tramway",
            "Deux roues non motorisées dit transport doux (vélo, trottinette, roller...)",
            "Deux roues motorisées (moto, scooter)",
            "Marche à pied (ou course)",
            "Autre"
          ]
        },
        {
          id: "spendTimeTransport",
          type: "option",
          label:
            "Parmi les modes de transports suivants, quel est celui dans lequel vous passez le plus de temps au cours de votre trajet domicile-travail ?",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train (RER,…)",
            "Métro",
            "Bus",
            "Tramway",
            "Deux roues non motorisées dit transport doux (vélo, trottinette, roller...)",
            "Deux roues motorisées (moto, scooter)",
            "Marche à pied (ou course)",
            "Autre"
          ]
        },
        {
          id: "minuteTimeTransport",
          type: "number",
          label: "Combien de temps (en minutes) mettez-vous pour :",
          possibilities: ["Voiture personnelle", "Voiture de fonction/service"]
        },
        {
          id: "distanceTransport",
          type: "number",
          label: "Quelle distance (en kms) parcourez-vous pour :",
          possibilities: ["le trajet domicile-travail ou travail-domicile ?"]
        },
        {
          id: "moneyTransport",
          type: "number",
          label:
            "Combien vous coûtent (en euros) vos déplacements en moyenne pour :",
          possibilities: ["aller travailler (par mois) ? "]
        },
        {
          id: "distanceTransport",
          type: "option",
          label:
            "Pour quelle(s) raison(s) avez-vous choisi votre mode de déplacement principal ?",
          possibilities: ["aller travailler (par mois) ? "]
        }
      ]
    };
  }

  change(e) {
    alert(e.target.value);
  }

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="sondage mt-2">
          <h3>Sondage</h3>
          <form className="mt-5">
            {this.state.questions.map(data => {
              switch (data.type) {
                case "option":
                  return <Option data={data} />;

                case "checkbox":
                  return <Checkbox data={data} />;
                case "number":
                  return <Number data={data} />;
                default:
                  return <p>Il y a une erreur.</p>;
              }

              //return <p>{data.type}</p>;
            })}
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Sondage;
