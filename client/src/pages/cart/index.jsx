import { useState, useEffect } from "react";
import instance from "../../utils/customizeAxios";


const Cart = () => {  
  const [data, setData] = useState();
  // Test API from Server
  useEffect(() => {
    const fetchTest = async () => {
      instance
        .get("/api/user", {
          withCredentials: false,
        })
        .then((response) => {
          console.log("data: ", response.data);
          setData(response.data);
        })
        .catch((err) => console.error(err));
    };
    fetchTest();
  }, []);

  return <>Data --- </>;
}


export default Cart