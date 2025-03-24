import { getCookie } from "../../utils/security";
import Checkout from "./CheckOut";
import { useSelector } from "react-redux";

export default function CheckOut() {
  const token = getCookie("access_token")
  const {orders} = useSelector((state)=>state.order)

  return (
    <>{token ? <div
      style={{
        maxWidth: window.innerWidth >= 1024 ? "70%" : "100%", // Apply 80% width only for large screens
        margin: "0 auto",
      }}
    >
      <Checkout data={orders} />
    </div> : (<h2 style={{textAlign: "center"}}>🔴 Chưa Login ai cho mà vào :))</h2>)}</>
  );
}
