import { useState, useEffect } from "react";
import instance from "../../utils/customizeAxios";


const Cart = () => {  
  const [data, setData] = useState();
  // Test API from Server
  useEffect(() => {
    const fetchTest = async () => {
      instance
        .get("/api/db", {
          withCredentials: false,
        })
        .then((response) => {
          console.log("data: ", response.data);
          setData(response.data.message);
        })
        .catch((err) => console.error(err));
    };
    fetchTest();
  }, []);

  return <>Data --- {data}</>;
}


export default Cart