/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

-- Table `user`
INSERT INTO `user` (`email`, `password`, `role`) VALUES
('admin', 'admin', 'admin'),
('user1', 'pass', 'user'),
('user2', 'pass', 'user');

-- Table `user_profile`
INSERT INTO `user_profile` (`user_id`, `name`, `phone`, `dob`) VALUES
(1, 'Nguyễn Khắc Anh', '0901234567', '1980-01-01'),
(2, 'Nguyễn Văn Nam', '0902345678', '1990-02-02'),
(3, 'Tống Thị Như Quỳnh', '0903456789', '1995-03-03');

-- Table `category`
INSERT INTO `category` (`name`, `description`) VALUES
('Electronics', 'Electronic gadgets and devices'),
('Clothing', 'Men and Women Clothing'),
('Present', 'Furniture for home and office');

-- Table `product`
INSERT INTO `product` (`category_id`, `name`, `price`, `quantity`, `discount`, `description`) VALUES
(1, 'Laptop', 15000000.00, 100, 10, 'High performance laptop for professionals'),
(1, 'Smartphone', 5000000.00, 200, 5, 'Latest model smartphone with all features'),
(2, 'T-shirt', 200000.00, 500, 0, 'Cotton T-shirt for men'),
(2, 'Jeans', 400000.00, 300, 0, 'Denim jeans for casual wear'),
(3, 'Gift Box', 500000.00, 100, 5, 'A beautiful gift box for all occasions'),
(3, 'Personalized Mug', 200000.00, 200, 10, 'Customizable mug for birthdays and celebrations');

-- Table `order`
INSERT INTO `order` (`user_id`, `product_id`, `number_buy`, `total_price`, `status`, `date`) VALUES
(2, 1, 1, 13500000.00, 'paid', '2025-02-24 10:00:00'),
(3, 2, 2, 10000000.00, 'unpaid', '2025-02-24 11:00:00'),
(1, 4, 3, 1200000.00, 'paid', '2025-02-24 12:00:00'),
(2, 6, 1, 3000000.00, 'unpaid', '2025-02-24 13:00:00');
