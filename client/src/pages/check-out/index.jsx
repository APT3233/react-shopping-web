import { getCookie } from "../../utils/security";
import Checkout from "./CheckOut";

export default function CheckOut() {
  const token = getCookie("access_token")
  
  return (
    <>{token ? <div
      style={{
        maxWidth: window.innerWidth >= 1024 ? "70%" : "100%", // Apply 80% width only for large screens
        margin: "0 auto",
      }}
    >
      <Checkout />
    </div> : (<h2 style={{textAlign: "center"}}>🔴 Login required !</h2>)}</>
  );
}
