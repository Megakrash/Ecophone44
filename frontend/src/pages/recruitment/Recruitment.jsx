import React from "react";
import Navbar from "@components/navbar/Navbar";
import { Link } from "react-router-dom";

function Recruitment() {
  return (
    <div className="recruitment">
      <Navbar />
      <img
        className="recruitment_header"
        src={`${
          import.meta.env.VITE_PORT_BACKEND
        }/assets/images/general/recruitment.jpeg`}
        alt="recrutement"
      />
      <div className="recruitment-box">
        <h1 className="recruitment_title">Poste à pourvoir</h1>
        <h2 className="recruitment_title2">TECHNICIEN POLYVALENT</h2>
        <h3 className="recruitment_title3">À propos de nous :</h3>
        <p className="recruitment_text">
          Nous sommes une entreprise spécialisée dans la réparation et dans la
          vente de smartphones. Notre mission est de fournir des solutions de
          réparation fiables et abordables, tout en contribuant à la réduction
          des déchets électroniques. Dans le cadre de notre croissance continue,
          nous recherchons un technicien réparateur de smartphones passionné et
          compétent pour rejoindre notre équipe.
        </p>
        <h3 className="recruitment_title3">Description du poste :</h3>
        <p className="recruitment_text">
          En tant que technicien réparateur de smartphones, vous serez
          responsable de diagnostiquer, réparer et entretenir une variété de
          modèles de smartphones. Votre rôle principal consistera à effectuer
          des réparations matérielles et logicielles, à remplacer les pièces
          défectueuses, à résoudre les problèmes de connectivité et à effectuer
          des tests de qualité pour garantir le bon fonctionnement des
          appareils. Vous devrez également maintenir un haut niveau de précision
          et de professionnalisme dans toutes vos tâches.
        </p>
        <h3 className="recruitment_title3">Responsabilités principales :</h3>
        <li className="recruitment_text">
          - Diagnostiquer et résoudre les problèmes matériels et logiciels des
          smartphones.
        </li>
        <li className="recruitment_text">
          - Remplacer les composants défectueux, tels que les écrans, les
          batteries, les boutons, etc.
        </li>
        <li className="recruitment_text">
          - Effectuer des mises à jour logicielles et des réinitialisations
          d’usine.
        </li>
        <li className="recruitment_text">
          {" "}
          - Assurer un contrôle qualité rigoureux après chaque réparation.
        </li>
        <li className="recruitment_text">
          - Maintenir un inventaire précis des pièces de rechange et des outils.
        </li>
        <li className="recruitment_text">
          - Fournir un service clientèle de haute qualité en répondant aux
          questions et aux préoccupations des clients.
        </li>
        <h3 className="recruitment_title3">Profil recherché :</h3>
        <li className="recruitment_text">
          - Expérience préalable en réparation de smartphones ou dans un domaine
          connexe.
        </li>
        <li className="recruitment_text">
          - Solides compétences en diagnostic et en résolution de problèmes.
        </li>
        <li className="recruitment_text">
          - Connaissance approfondie des différents modèles de smartphones et de
          leurs composants.
        </li>
        <li className="recruitment_text">
          - Capacité à utiliser des outils et des équipements de réparation
          spécialisés.
        </li>
        <li className="recruitment_text">
          - Excellentes compétences en communication et service à la clientèle.
        </li>
        <li className="recruitment_text">
          - Capacité à travailler de manière autonome et à respecter les délais.
        </li>
        <h3 className="recruitment_title3">Nous offrons :</h3>
        <li className="recruitment_text">
          - Un environnement de travail dynamique et stimulant.
        </li>
        <li className="recruitment_text">
          - L’opportunité de travailler avec une équipe passionnée et dédiée.
        </li>
        <li className="recruitment_text">
          - Des possibilités d’apprentissage et de développement professionnel.
        </li>
        <li className="recruitment_text">
          - Une rémunération compétitive en fonction de l’expérience et des
          compétences.
        </li>
        <h3 className="recruitment_title3">Comment postuler :</h3>
        <p className="recruitment_text">
          Si vous êtes prêt à relever ce défi passionnant et à rejoindre notre
          équipe, veuillez envoyer votre CV et une lettre de motivation à
          l’adresse suivante : contact@ecophone44.com. Veuillez indiquer le
          titre du poste dans l’objet de votre e-mail.
        </p>
        <p className="recruitment_text">
          Nous remercions tous les candidats de leur intérêt. Veuillez noter que
          seuls les candidats sélectionnés seront contactés pour une entrevue.
        </p>
        <p className="recruitment_text">
          Nous attendons avec impatience de recevoir votre candidature et de
          discuter de cette opportunité passionnante de rejoindre notre équipe.
        </p>
        <p className="recruitment_text">L’équipe Ecophone44</p>
        <Link to="mailto: contact@ecophone44.megakrash.com">
          <div className="recruitment_btn">Postulez à cette offre</div>
        </Link>
      </div>
    </div>
  );
}

export default Recruitment;
