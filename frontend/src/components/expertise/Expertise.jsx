import React from "react";

function Expertise() {
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/general/`;
  return (
    <div className="expertise">
      <div className="expertise_section">
        <img
          className="expertise_section_icon"
          src={`${picPath}fast-icon.svg`}
          alt="eco"
        />
        <p className="expertise_section_title">Rapidité</p>
        <p className="expertise_section_text">
          Grâce à leur expertise et à leur expérience, nos experts en réparation
          de smartphones sont en mesure de diagnostiquer rapidement les
          problèmes et de trouver des solutions appropriées. Ils mettront tout
          en œuvre pour résoudre les problèmes de votre téléphone dans les
          meilleurs délais.
        </p>
      </div>
      <div className="expertise_section">
        <img
          className="expertise_section_icon"
          src={`${picPath}productivity-icon.svg`}
          alt="eco"
        />
        <p className="expertise_section_title">Expérience</p>
        <p className="expertise_section_text">
          En choisissant nos experts en réparation de smartphones, vous faites
          le choix de la qualité, de la fiabilité et de la tranquillité
          d’esprit. Votre téléphone est entre les mains de professionnels
          compétents et dévoués qui feront tout leur possible pour le remettre
          en état de fonctionnement optimal.
        </p>
      </div>
      <div className="expertise_section">
        <img
          className="expertise_section_icon"
          src={`${picPath}eco-icon.svg`}
          alt="eco"
        />
        <p className="expertise_section_title">Environnement</p>
        <p className="expertise_section_text">
          Nous nous engageons à réduire notre empreinte écologique en adoptant
          des mesures visant à minimiser notre impact sur la planète. Cela
          inclut une attention particulière au recyclage des e-déchets, en
          mettant l’accent sur la gestion appropriée des batteries usagées.
        </p>
      </div>
      <div className="expertise_section">
        <img
          className="expertise_section_icon"
          src={`${picPath}garantee-icon.svg`}
          alt="eco"
        />
        <p className="expertise_section_title">Garantie</p>
        <p className="expertise_section_text">
          Nous faisons exclusivement usage de pièces officielles ou de pièces
          identiques aux originaux. De plus, nous soumettons chaque pièce à des
          tests et à un contrôle rigoureux afin de garantir une qualité
          optimale.
        </p>
      </div>
    </div>
  );
}

export default Expertise;
