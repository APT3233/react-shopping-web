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
('Car', 'Super Car');

-- Table `product`
INSERT INTO `product` (`category_id`, `name`, `price`, `quantity`, `discount`, `rating`, `reviews`, `description`, `img_link`)
VALUES 
(),
(3, 'Ferrari LaFerrari', 1500000, 5, 0, 4.8, 15, 'The Ferrari LaFerrari is the first hybrid supercar from Ferrari, combining a V12 engine with an electric motor to deliver a total of 950 horsepower. It features an aerodynamically optimized design and luxurious interior.', 'https://w0.peakpx.com/wallpaper/45/305/HD-wallpaper-black-2017-spider-laferrari-ferrari-new-items.jpg'),
(3, 'Lamborghini Huracan', 1200000, 8, 5, 4.7, 20, 'The Lamborghini Huracan is a sports car with a V10 engine producing 640 horsepower. It boasts Lamborghini’s signature sharp lines and impressive performance.', 'https://www.turbo.fr/sites/default/files/styles/slideshow_images/public/slideshow/slides/2020-08/5f29653681b9a.jpg?itok=YVmQyLqQ'),
(3, 'Porsche 911 Turbo', 900000, 10, 0, 4.6, 18, 'The Porsche 911 Turbo is an icon in the sports car world, with a turbocharged 6-cylinder engine producing 580 horsepower. It combines classic design with modern technology.', 'https://w0.peakpx.com/wallpaper/587/577/HD-wallpaper-porsche-911-turbo-s-cabriolet-2020-2.jpg'),
(3, 'Aston Martin DB10', 700000, 3, 10, 4.5, 10, 'The Aston Martin DB10 is a special car designed for the James Bond film, featuring a V8 engine with 470 horsepower. It has a luxurious and unique design.', 'https://w0.peakpx.com/wallpaper/157/248/HD-wallpaper-aston-martin-db10-aston-martin-cars.jpg'),
(3, 'McLaren 720S', 1000000, 6, 0, 4.9, 25, 'The McLaren 720S is a supercar with a V8 twin-turbo engine producing 710 horsepower. Its aerodynamic design and lightweight construction allow for impressive acceleration.', 'https://www.turbo.fr/sites/default/files/styles/card_315x225/public/2019-03/comparatif-mclaren-720S-spider-mclaren-600lt-spider.png.webp?itok=NWP-Sy1n'),
(3, 'Bugatti W16 Mistral', 2500000, 2, 0, 4.8, 30, 'The Bugatti W16 Mistral is a roadster with a W16 quad-turbo engine producing 1,600 horsepower. It combines class-leading design and performance.', 'https://www.turbo.fr/sites/default/files/styles/slideshow_images/public/slideshow/slides/2025-02/67b5f671ca9a7.jpg?itok=QqT-y1OA'),
(3, 'Audi R8 V10', 1800000, 7, 5, 4.7, 12, 'The Audi R8 V10 is a supercar with a V10 engine producing 610 horsepower. It features sporty design and advanced technology from Audi.', 'https://www.turbo.fr/sites/default/files/styles/slideshow_images/public/slideshow/slides/2022-12/63974409a7da7.jpg?itok=JMWixmf6');


-- Table `order`
INSERT INTO `order` (`user_id`, `product_id`, `number_buy`, `total_price`, `status`, `date`) VALUES
(2, 1, 1, 13500000.00, 'paid', '2025-02-24 10:00:00'),
(3, 2, 2, 10000000.00, 'unpaid', '2025-02-24 11:00:00'),
(1, 4, 3, 1200000.00, 'paid', '2025-02-24 12:00:00'),
(2, 6, 1, 3000000.00, 'unpaid', '2025-02-24 13:00:00');
