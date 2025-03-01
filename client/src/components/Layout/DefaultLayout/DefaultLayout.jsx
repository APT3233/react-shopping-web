import { Outlet } from "react-router-dom";
import "../../../assets/css/main.css";
import Header from "../../ui/Main/Header";
import Footer from "../../ui/Main/Footer";


export default function DefaultLayout() {
  return (
    <>
      <Header />
      <section className="section-main">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}
