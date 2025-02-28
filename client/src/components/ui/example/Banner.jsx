import React from "react";
import { Button, Carousel, Col, Row } from "antd";
import "../../../assets/css/main.css";
import banner_1 from "../../../assets/img/banner-16.webp";
import banner_2 from "../../../assets/img/banner-17.webp";

const dataBanner = [
  {
    id: 1,
    title: "LIFESTYLE COLLECTION",
    type: "MEN",
    discount: "35% OFF",
    sale: "SALE UP TO ",
    description: "Get Free Shipping on orders over 999.00$",
    imgLink:
      "https://template.getbazaar.io/assets/images/banners/banner-15.jpg",
  },
  {
    id: 2,
    title: "LIFESTYLE COLLECTION",
    type: "MEN",
    discount: "30% OFF",
    sale: "SALE UP TO",
    description: "Get Free Shipping on orders over 999.00$",
    imgLink:
      "https://template.getbazaar.io/assets/images/banners/banner-25.jpg",
  },
];
const dataBanner_2 = [
  {
    id: 1,
    title: "NEW ARRIALS",
    sale: "SUMMER SALE 20% OFF",
    imgLink: banner_1
  },
  {
    id: 2,
    title: "GAMING 4K",
    sale: "DESKTOPS & LAPTOPS",
    imgLink: banner_2
  }
]


const Banner = () => (
  <Row gutter={16}>
    <Col xs={24} sm={24} lg={18}>
      <Carousel autoplay>
        {dataBanner.map((item, index) => (
          <div key={index} className="banner-main__content">
            <h2 className="banner-content-title">{item.title}</h2>
            <h1 className="banner-content-type">{item.type}</h1>
            <h2 className="banner-content-sale">
              {item.sale}
              <h1 style={{ color: "red" }}>{item.discount}</h1>
            </h2>
            <h5 className="banner-content-des">{item.description}</h5>
            <div className="banner-content-btn">
              <Button type="primary">
                Shop Now
              </Button>
            </div>

            <img
              className="banner-main__img"
              src={item.imgLink}
              alt={`banner-${index}`}
            />
          </div>
        ))}
      </Carousel>
    </Col>

    <Col xs={24} md={24} lg={6} className="banner-right">
      {dataBanner_2.map((item, index) => (
        <div key={index} className="banner-right__content">
          <h3 className="banner-right-title">{item.title}</h3>
          <h2 className="banner-right-sale">{item.sale}</h2>
          <h3 className="banner-right-btn">Shop now</h3>
          <img
            src={item.imgLink}
            alt={`img-${index}`}
            className="banner-right__img"
          />
        </div>
      ))}
    </Col>
  </Row>
);

export default Banner;
