import logo from "../../../assets/img/logo.png";
import "../../../assets/css/header.css";
import { useState } from "react";
import { Select, Button, Row, Col } from "antd";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

// Fetch API call /api/categories
const OPTIONS = ["Clothes", "Electronic", "Bananas", "Helicopters"];

export default function Header() {
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const className = (e) => {
    return e.isActive ? "navbar__link--active" : "navbar__link";
  };
  return (
    <>
      <div className="header">
        <div className="header-container">
          <div className="header-box">
            <Row
              gutter={16}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Col xs={24} sm={4} lg={6}>
                <div className="header-logo">
                  <Navbar />
                  <NavLink to="/" className={className}>
                    <img
                      src={logo}
                      alt="logo-team"
                      style={{ cursor: "pointer" }}
                    />
                  </NavLink>
                </div>
              </Col>
              <Col xs={16} sm={16} lg={12}>
                <div
                  className="header-search"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Select
                    mode="multiple"
                    placeholder="Search product"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    style={{
                      width: "100%",
                      marginRight: "10px",
                      backgroundColor: "#f3f4f9",
                    }}
                    options={filteredOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                  <Button
                    type="primary"
                    loading={loadings[0]}
                    onClick={() => enterLoading(0)}
                    style={{ backgroundColor: "#202738" }}
                  >
                    Search
                  </Button>
                </div>
              </Col>
              <Col xs={4} sm={4} lg={6}>
                <div className="header-info">
                  <AccountCircleOutlinedIcon
                    style={{
                      cursor: "pointer",
                      fill: "currentcolor",
                      color: "rgb(125, 135, 156)",
                    }}
                  />
                  <NavLink to="#" className={className}>
                    <ShoppingBagOutlinedIcon
                      style={{
                        cursor: "pointer",
                        fill: "currentcolor",
                        color: "rgb(125, 135, 156)",
                      }}
                    />
                  </NavLink>
                </div>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 0",
              }}
            >
              <div className="header-nav header-nav-container">
                <ul
                  style={{
                    display: "flex",
                    gap: "30px",
                    listStyleType: "none",
                    fontSize: "17px",
                    color: "rgb(31, 41, 55)",
                    cursor: "pointer",
                  }}
                >
                  <li>
                    <NavLink
                      className={className}
                      to="/"
                      style={{ textDecoration: "none", color: "inherit" }}
                      
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={className}
                      to="/product"
                      style={{ textDecoration: "none", color: "inherit" }}
                      
                    >
                      Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={className}
                      to="/cart"
                      style={{ textDecoration: "none", color: "inherit" }}
                      
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={className}
                      to="/contact"
                      style={{ textDecoration: "none", color: "inherit" }}
                      
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={className}
                      to="/sign-in"
                      style={{ textDecoration: "none", color: "inherit" }}
                      
                    >
                      Login
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
