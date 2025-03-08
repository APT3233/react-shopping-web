import CardList from "../../components/Card/CardList";
import MarqueeAnimation from "../../components/ui/Marquee";
import instance from "../../utils/customizeAxios";
import { useState, useEffect } from "react";

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

const Product = () => {
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
      <CardList
        title="Top Super Car Deal"
        data={data.car}
        sliderClassName="slider1"
      />
      <MarqueeAnimation title={title} desc={desc} /> {/* Scroll Notification */}

      <CardList
        title="Clothing"
        data={data.clothing}
        sliderClassName="slider2"
      />
      <MarqueeAnimation title={title} desc={desc} /> {/* Scroll Notification */}

      <CardList
        title="Accessory"
        data={data.accessory}
        sliderClassName="slider3"
      />
    </>
  );
};

export default Product;
