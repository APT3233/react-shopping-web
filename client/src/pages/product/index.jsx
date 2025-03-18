import CardList from "../../components/Card/CardList";
import MarqueeAnimation from "../../components/ui/Marquee";
import instance from "../../utils/customizeAxios";
import { useState, useEffect } from "react";

const titleCar = "Black Friday ";
const descCar = [
  "Drive the future - your dream car awaits!",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "Speed into savings with our hot deals!",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "Find your perfect ride today - zoom in now!",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
];

const titleOther = "HOT ";
const descOther = [
  "Step into style - your wardrobe deserves it!",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "Fashion that fits - grab the latest trends now!",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "Dress bold, shine bright - shop with us today!",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
  "&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;",
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
      <MarqueeAnimation title={titleCar} desc={descCar} /> {/* Scroll Notification */}

      <CardList
        title="Clothing"
        data={data.clothing}
        sliderClassName="slider2"
      />
      <MarqueeAnimation title={titleOther} desc={descOther} /> {/* Scroll Notification */}

      <CardList
        title="Accessory"
        data={data.accessory}
        sliderClassName="slider3"
      />
    </>
  );
};

export default Product;
