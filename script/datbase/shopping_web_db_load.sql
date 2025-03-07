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
('Accessory', 'Accessory'),
('Clothing', 'Men and Women Clothing'),
('Car', 'Super Car');

-- Table `product`
INSERT INTO `product` (`category_id`, `name`, `price`, `quantity`, `discount`, `rating`, `reviews`, `description`, `img_link`)
VALUES 
(1, 'Corset', 500, 5, 0, 4.8, 15, 'A stylish corset designed to enhance your silhouette. Perfect for formal occasions or adding a dramatic flair to your outfit.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Corset.png'),
(1, 'Corset 2', 1200, 5, 0, 4.8, 15, 'A second version of the corset, with a more refined design and a perfect fit for all occasions.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Corset_2.png'),
(1, 'Glasses', 200, 5, 5, 4.8, 15, 'A pair of stylish glasses that add a touch of elegance to your look. Available now with a 5% discount.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Glasses.png'),
(1, 'Glasses 2', 100, 5, 0, 4.8, 15, 'A second pair of glasses, designed for everyday wear. A stylish accessory for any outfit.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Glasses_2.png'),
(1, 'Hat', 600, 5, 5, 4.8, 15, 'A classic hat, perfect for sun protection and adding a sophisticated touch to your style. Available with a 5% discount.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Hat.png'),
(1, 'Hat 2', 500, 5, 0, 4.8, 15, 'A second stylish hat, designed to complement any casual or formal look.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Hat_2.png'),
(1, 'Towel', 200, 5, 5, 4.8, 15, 'A soft towel for everyday use, offering comfort and absorbency. Available with a 5% discount.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Towel.png'),
(1, 'Towel 2', 400, 5, 5, 4.8, 15, 'A second towel designed for a more luxurious experience, with extra softness and absorbency. Available with a 5% discount.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/PhuKien/PK_Towel_2.png'),
(2, 'Hoodie', 1500, 5, 0, 4.8, 15, 'A comfortable hoodie made with soft fabric, perfect for casual wear or staying warm during cold weather.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_Hoodie.png'),
(2, 'Polo White', 1200, 5, 0, 4.8, 15, 'A classic white polo shirt made of breathable material, ideal for both casual and semi-formal occasions.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_Polo_2.png'),
(2, 'Polo White', 900, 5, 5, 4.8, 15, 'A stylish white polo shirt with a comfortable fit, perfect for a smart-casual look. Now available with a 5% discount.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_Somi.png'),
(2, 'Trousers', 1900, 5, 0, 4.8, 15, 'A pair of elegant trousers with a tailored fit, made from high-quality fabric for a professional look.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_Trousers.png'),
(2, 'Cow Shirt', 900, 5, 5, 4.8, 15, 'A quirky cow print shirt, perfect for a fun and bold look. Available at a 5% discount.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_cowShirt.png'),
(2, 'Sweater', 1500, 5, 0, 4.8, 15, 'A cozy sweater made with soft fabric, ideal for layering on cooler days or relaxing at home.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_sweater.png'),
(2, 'Trousers 2', 900, 5, 5, 4.8, 15, 'A second pair of stylish trousers, perfect for a modern and professional look. Get a 5% discount on this item.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_trousers_2.png'),
(2, 'Polo 2', 900, 5, 5, 4.8, 15, 'Another variant of the classic polo, offering a comfortable fit and great style. Available at a 5% discount.', 'https://raw.githubusercontent.com/APT3233/my_journey/main/data/Clothes/Clothes_polo.png'),
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
