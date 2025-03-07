import { useEffect, useState } from "react";
import instance from "../../utils/customizeAxios";

export default function Contact() {
  const [data, setData] = useState();
  // Test API from Server
  useEffect(() => {
    const fetchTest = async () => {
      instance
        .get("/api/test", {
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

  return <>Contact Page -3--- {data}</>;
}
