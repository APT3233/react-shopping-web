import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../utils/customizeAxios";
import CardList from "../../components/Card/CardList";

const Search = () => {
  const location = useLocation();
  const [data, setData] = useState({
    car: [],
    clothing: [],
    accessory: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (categories) => {
    setLoading(true);
    try {
      const response = await instance.get("/api/products", {
        params: { categories: categories },
      });
      if (response.status === 200) {
        const products = response.data;
        const car = products.filter((product) => product.categoryId === 3);
        const clothing = products.filter((product) => product.categoryId === 2);
        const accessory = products.filter((product) => product.categoryId === 1);

        setData({
          car,
          clothing,
          accessory,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Chỉ cần setLoading ở đây
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categories = queryParams.get("categories");
    if (categories) {
      fetchData(categories);
    } else {
      fetchData("");
    }
  }, [location.search]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data.car.length > 0 && (
            <CardList
              title="Super Car"
              data={data.car}
              sliderClassName="slider1"
            />
          )}
          {data.clothing.length > 0 && (
            <CardList
              title="Clothing"
              data={data.clothing}
              sliderClassName="slider2"
            />
          )}
          {data.accessory.length > 0 && (
            <CardList
              title="Accessory"
              data={data.accessory}
              sliderClassName="slider3"
            />
          )}
          {data.car.length === 0 &&
            data.clothing.length === 0 &&
            data.accessory.length === 0 && (
              <p>No products found for the selected categories.</p>
            )}
        </>
      )}
    </div>
  );
};

export default Search;