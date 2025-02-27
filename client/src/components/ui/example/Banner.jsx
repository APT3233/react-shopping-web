import React from "react";
import { Carousel, Col, Row } from "antd";
import "../../../assets/css/main.css";
import banner_1 from "../../../assets/img/banner-16.webp"
import banner_2 from "../../../assets/img/banner-17.webp"

const imgLink = [
  "https://template.getbazaar.io/assets/images/banners/banner-15.jpg",
  "https://template.getbazaar.io/assets/images/banners/banner-25.jpg",
];
const imgLink2 = [
  banner_1,
  banner_2
]
const Banner = () => (
  <Row gutter={16}>
    <Col xs={24} sm={24} lg={18}>
      <Carousel autoplay>
        {imgLink.map((img, index) => (
          <div key={index}>
            <img className="banner-main" src={img} alt={`banner-${index}`} />
          </div>
        ))}
      </Carousel>
    </Col>
    
    <Col xs={24} md={6} className="banner-right">
      {imgLink2.map((img, index) => (
        <div key={index} >
          <img src={img} alt={`img-${index}`} className="banner-right__img"></img>
        </div>
      ))}
    </Col>
  </Row>
);

export default Banner;
