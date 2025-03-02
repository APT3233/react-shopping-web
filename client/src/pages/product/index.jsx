import CardList from "../../components/Card/CardList"

// Parent Component
const Product = () => {
  const productsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics',
      name: 'Premium Headphones',
      rating: '4.5',
      reviews: '10',
      price: '299.99',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      category: 'Wearables',
      name: 'Smart Watch',
      rating: '4.0',
      reviews: '15',
      price: '199.99',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
      category: 'Electronics',
      name: 'Wireless Speaker',
      rating: '4.8',
      reviews: '20',
      price: '149.99',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
      category: 'Electronics',
      name: 'Wireless Speaker',
      rating: '4.8',
      reviews: '20',
      price: '149.99',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
      category: 'Electronics',
      name: 'Wireless Speaker',
      rating: '4.8',
      reviews: '20',
      price: '149.99',
    },
    ,
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      category: 'Wearables',
      name: 'Smart Watch',
      rating: '4.0',
      reviews: '15',
      price: '199.99',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
      category: 'Electronics',
      name: 'Wireless Speaker',
      rating: '4.8',
      reviews: '20',
      price: '149.99',
    },
  ];

  return (
    <div>
      <CardList title="Top Electronics Deal" data={productsData} />
    </div>
  );
};

export default Product;