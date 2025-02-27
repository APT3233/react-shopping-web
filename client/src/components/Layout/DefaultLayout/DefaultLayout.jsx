import { Outlet } from "react-router-dom";
import "../../../assets/css/main.css";
import Header from "../../ui/Main/Header";
import Footer from "../../ui/Main/Footer";
import Banner from "../../ui/example/Banner";
import Feauter_1 from "../../ui/example/Feauter_1";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <section className="section-main">
        <Banner />
        <Feauter_1 />
        <Outlet />
      </section>
      <Footer />
    </>
  );
}
