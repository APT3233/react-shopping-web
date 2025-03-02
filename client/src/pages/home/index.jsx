import Banner from "../../components/ui/example/Banner";
import Feauter_1 from "../../components/ui/example/Feauter_1";
import MarqueeAnimation from "../../components/ui/Marquee";
import Product from "../product";

const Home = () => {
  const title = "APT Said "
  const desc = [
    "Nạp tiền vào donate cho tao",
    "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
    "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
    "Đời không sóng gió đời vô vị",
    "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
    "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
    "Yêu làm cái gì cho rách việc",
    "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
    "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  ];
  return (
    <>
      <Banner />
      <Feauter_1 />
      <Product />
      {/* Scroll Notification */}
      <MarqueeAnimation title={title} desc={desc} />
    </>
  );
};

export default Home;
