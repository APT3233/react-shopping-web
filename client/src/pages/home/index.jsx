import { useEffect, useState, memo } from "react";
import Banner from "../../components/ui/example/Banner";
import Feauter_1 from "../../components/ui/example/Feauter_1";
import MarqueeAnimation from "../../components/ui/Marquee";
import CardList from "../../components/Card/CardList";
import { getAllProducts } from "../../services/Product";

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

const Home = () => {
  const [data, setData] = useState({
    car: [],
    clothing: [],
    accessory: [],
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();

        if (response.success) {
          const data = response.data;
          const car = data.filter((data) => data.categoryId === 3);
          const clothing = data.filter((data) => data.categoryId === 2);
          const accessory = data.filter((data) => data.categoryId === 1);

          setData({
            car,
            clothing,
            accessory,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const MemoizedCardList = memo(CardList);
  
  return (
    <>
      <Banner />
      <Feauter_1 />
      {/* First CardList with its own slider class */}
      <MemoizedCardList
        title="Top Super Car Deal"
        data={data.car}
        sliderClassName="slider1"
        isLoading={loading}
      />
      <MarqueeAnimation title={titleCar} desc={descCar} />{" "}
      {/* Scroll Notification */}
      <MemoizedCardList
        title="Clothing"
        data={data.clothing}
        sliderClassName="slider2"
        isLoading={loading}
        
      />
      <MarqueeAnimation title={titleOther} desc={descOther} />{" "}
      {/* Scroll Notification */}
      <MemoizedCardList
        title="Accessory"
        data={data.accessory}
        sliderClassName="slider3"
        isLoading={loading}
      />
    </>
  );
};

export default Home;
