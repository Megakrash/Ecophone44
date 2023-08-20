import React from "react";

function Local() {
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/general/`;

  return (
    <div className="local">
      <div className="local_article">
        <h1 className="local_article_title">
          Votre réparateur local depuis plus de 10 ans !
        </h1>
        <h3 className="local_article_title2">
          ECOPHONE44 : Votre expert en réparation de smartphones et tablettes à
          Nantes.
        </h3>
        <p className="local_article_text">
          Toutes les réparations sont effectuées sur place dans nos ateliers ce
          qui vous garantit un service rapide. De plus, notre emplacement nous
          permet de créer une véritable proximité avec nos clients et cela en
          priorisant la qualité et une relation de confiance.
        </p>
        <p className="local_article_text">
          <span>ECOPHONE 44</span> vous permet également de faire réparer votre
          appareil <span>sans vous déplacer</span> grâce à notre{" "}
          <span>service de livraison par coursier (02 52 10 37 71)</span>. Votre
          smartphone ou votre tablette est pris en charge dans la matinée sur{" "}
          <span>votre lieu de travail ou à votre domicile</span>, pour être
          réparé dans nos ateliers. Notre livreur vous restituera ensuite dans
          l’après midi votre appareil réparé.
        </p>
      </div>
      <div className="local_pic">
        <img
          className="local_pic_img"
          src={`${picPath}tech.jpg`}
          alt="technicien"
        />
      </div>
    </div>
  );
}

export default Local;
