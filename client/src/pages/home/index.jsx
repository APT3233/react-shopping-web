import { useEffect, useState } from "react";
import Banner from "../../components/ui/example/Banner";
import Feauter_1 from "../../components/ui/example/Feauter_1";
import MarqueeAnimation from "../../components/ui/Marquee";
import instance from "../../utils/customizeAxios";
import CardList from "../../components/Card/CardList";

const title = "Nam Said ";
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

const Home = () => {
  const [data, setData] = useState({
    car: [],
    clothing: [],
    accessory: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = instance.get("/api/products", {
        withCredentials: false,
      });

      const data = (await response).data;
      const car = data.filter((data) => data.categoryId === 3);
      const clothing = data.filter((data) => data.categoryId === 2);
      const accessory = data.filter((data) => data.categoryId === 1);

      setData({
        car,
        clothing,
        accessory,
      });
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Banner />
      <Feauter_1 />
      {/* First CardList with its own slider class */}
      <CardList title="Top Super Car Deal" data={data.car} sliderClassName="slider1" />

      <MarqueeAnimation title={title} desc={desc} /> {/* Scroll Notification */}
      
      <CardList title="Clothing" data={data.clothing} sliderClassName="slider2" />

      <MarqueeAnimation title={title} desc={desc} /> {/* Scroll Notification */}

      <CardList
        title="Accessory"
        data={data.accessory}
        sliderClassName="slider3"
      />
    </>
  );
};

export default Home;
