import Checkout from "./CheckOut";

export default function CheckOut() {
  return (
    <div
      style={{
        maxWidth: window.innerWidth >= 1024 ? "70%" : "100%", // Apply 80% width only for large screens
        margin: "0 auto",
      }}
    >
      <Checkout />
    </div>
  );
}
