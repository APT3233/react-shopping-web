import CartCart from "../../components/Card/CardCart";

const data = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    name: "Laptop Pro 2023",
    price: 1299.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
];

const Cart = () => {

  return <><CartCart initialCartItems={data} /></>;
};

export default Cart;
