import { useEffect, useState } from "react";
import CardCart from "../../components/Card/CardCart";
import { getCart } from "../../services/CartService";
import { useSelector } from "react-redux";

const Cart = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCart(user.email);
      console.log("[+] Response: ", response);

      if (response.success) {
        setData(response.cartItems)
      }
    };
    fetchData();
  }, []); 
 

  return <CardCart initialCartItems={data} />;
};

export default Cart;