import React from "react";
import { Link } from "react-router-dom";
import { MdPhoneIphone } from "react-icons/md";
import { FaTabletAlt, FaPlay } from "react-icons/fa";
import Navbar from "@components/navbar/Navbar";
import Header from "@components/header/Header";
import Expertise from "@components/expertise/Expertise";

export default function Home() {
  const picPath = `${import.meta.env.VITE_PORT_BACKEND}/assets/images/general/`;
  return (
    <div className="home">
      <Navbar />
      <Header />
      <h1 className="home_title">Que souhaitez-vous réparer ?</h1>
      <div className="home_link">
        <Link to="/brands/1">
          <div className="home_link_btn">
            <MdPhoneIphone className="home_link_btn_phone" />
            <p className="home_link_btn_text">SMARTPHONE</p>
            <FaPlay className="home_link_btn_play" />
          </div>
        </Link>
        <Link to="/brands/2">
          <div className="home_link_btn">
            <FaTabletAlt className="home_link_btn_phone" />
            <p className="home_link_btn_text">TABLETTE</p>
            <FaPlay className="home_link_btn_play" />
          </div>
        </Link>
      </div>
      <div className="home_refurb">
        <h1 className="home_title">
          Ou souhaitez-vous voir nos modèles reconditionnés ?
        </h1>
        <Link to="/brands/3">
          <p className="home_link_btn refurb-link">RECONDITIONNES</p>
        </Link>
      </div>
      <div className="home_article">
        <div className="home_article_img">
          <img
            className="home_article_img_pic"
            src={`${picPath}refurb.png`}
            alt="Reconditionnés"
          />
        </div>

        <div className="home_article_section">
          <p className="home_article_section_title">
            Smartphones Reconditionnés
          </p>
          <p className="home_article_section_text">
            La vente de smartphones reconditionnés est devenue de plus en plus
            populaire ces dernières années, offrant une alternative économique
            et écologique à l’achat de téléphones neufs. Les smartphones
            reconditionnés sont des appareils préalablement utilisés qui ont été
            réparés, remis à neuf et testés pour garantir leur bon
            fonctionnement. Nos techniciens effectuent les réparations
            nécessaires, remplacent les pièces défectueuses et nettoient les
            appareils pour les rendre aussi proches que possible d’un état neuf.
            Grâce à cette approche, vous pouvez profiter de smartphones fiables
            et performants à des prix compétitifs, tout en contribuant à la
            réduction des déchets électroniques et en prolongeant la durée de
            vie des appareils.
          </p>
          <Link to="/brands/3">
            <div className="home_link_btn text-btn">
              <p>Nos reconditionnés</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="home_article">
        <div className="home_article_section">
          <p className="home_article_section_title">
            Coques de protection téléphone
          </p>
          <p className="home_article_section_text">
            Ecophone44 vous propose un large choix de coques de protection pour
            votre téléphone, adaptées à tous les styles et toutes les marques.
            Que vous possédiez un iPhone, un Samsung, un Huawei ou tout autre
            smartphone, nous avons la coque parfaite pour vous. Nous proposons
            également des coques avec des fonctionnalités supplémentaires,
            telles que des porte-cartes intégrés pour vous permettre de ranger
            vos cartes de crédit ou de visite, des supports intégrés pour
            regarder des vidéos en toute commodité, ou encore des coques
            waterproof pour protéger votre téléphone de l’eau et de l’humidité.
          </p>
        </div>
        <img
          className="home_article_img"
          src={`${picPath}coques.png`}
          alt="Reconditionnés"
        />
      </div>
      <div className="home_article">
        <img
          className="home_article_img"
          src={`${picPath}hydrogel.png`}
          alt="Reconditionnés"
        />
        <div className="home_article_section">
          <p className="home_article_section_title">Protection hydrogel</p>
          <p className="home_article_section_text">
            Les films en hydrogel, découpés sur mesure, sont de plus en plus
            populaires, éclipsant progressivement et sans difficulté les films
            de protection en verre trempé. Le film hydrogel est une toute
            nouvelle technologie qui permet de protéger efficacement un écran de
            smartphone, tablette, console, etc. L’hydrogel est un mélange d’eau
            et de polymères qui rendent cette matière très résistante et
            incassable.
          </p>
        </div>
      </div>
      <Expertise />
    </div>
  );
}
