-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2024 at 04:28 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mahim_social`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `image`, `token`, `avatar`, `username`, `date`) VALUES
(1, 'MD Mahim All Saklain', 'Hello, How are you My name is MD Mahim All Saklain. I am a web developer.', 'http://localhost/Mahim-social/backend/files/posts/ms_post-6587b17bf9976b94b7cf2a5bcc5c52e0.jpg', 'ms-66c9ca2eb62e51f4599bad', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b358385db93256cc5a9a80d819ee7848.jpg', 'mdmahim06', '2024-01-23 11:07:49'),
(2, 'My name is sajib ahmed', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has su', 'http://localhost/Mahim-social/backend/files/posts/ms_post-e59db1583f6f0a14dd9490fbf2916afe.jpg', 'ms-d44e22f6a945f33cc0faca', 'http://localhost/Mahim-social/backend/files/users/avatar.png', 'sajib1boss', '2024-01-23 11:18:10'),
(3, 'Why do we use it?', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, co', 'http://localhost/Mahim-social/backend/files/posts/ms_post-3a0d15e0f84786a6d411962b773af86f.jpg', 'ms-66c9ca2eb62e51f4599bad', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b358385db93256cc5a9a80d819ee7848.jpg', 'mdmahim06', '2024-01-23 13:37:58'),
(4, 'Where does it come from?', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one ', 'http://localhost/Mahim-social/backend/files/posts/ms_post-4811e74c907f1d6b1edb93b48af4af04.jpg', 'ms-66c9ca2eb62e51f4599bad', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b358385db93256cc5a9a80d819ee7848.jpg', 'mdmahim06', '2024-01-23 13:38:21'),
(5, 'Where can I get some?', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, yo', 'http://localhost/Mahim-social/backend/files/posts/ms_post-87f55423af64a2773c54d556076cec58.jpg', 'ms-66c9ca2eb62e51f4599bad', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b358385db93256cc5a9a80d819ee7848.jpg', 'mdmahim06', '2024-01-23 13:38:57'),
(6, 'The standard Lorem Ipsum passage, used since the 1500s', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 'http://localhost/Mahim-social/backend/files/posts/ms_post-c084135234b6af5bafc81a57ee100f0a.jpg', 'ms-d44e22f6a945f33cc0faca', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b6cb0735e3432bb742a2a4c9070726b1.jpg', 'sajib1boss', '2024-01-23 13:41:54'),
(7, 'Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC', '\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia volupt', 'http://localhost/Mahim-social/backend/files/posts/ms_post-50a4bf82e5d7f3df8b4775f67be95bf7.jpg', 'ms-d44e22f6a945f33cc0faca', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b6cb0735e3432bb742a2a4c9070726b1.jpg', 'sajib1boss', '2024-01-23 13:42:25'),
(8, '1914 translation by H. Rackham', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human h', 'http://localhost/Mahim-social/backend/files/posts/ms_post-e363a27ee0bf30526d42bc1ae0a2e439.jpg', 'ms-d44e22f6a945f33cc0faca', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b6cb0735e3432bb742a2a4c9070726b1.jpg', 'sajib1boss', '2024-01-23 13:42:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT 'http://localhost/Mahim-social/backend/files/users/avatar.png',
  `bio` varchar(255) NOT NULL DEFAULT 'Welcome to mahim social media',
  `token` varchar(255) NOT NULL,
  `active` varchar(255) NOT NULL DEFAULT 'false',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fname`, `lname`, `email`, `password`, `avatar`, `bio`, `token`, `active`, `date`) VALUES
(12, 'mdmahim06', 'MD Mahim', 'All Saklain', 'mdmahimbd2033@gmail.com', '$2y$10$iK87idmpAUm6Q4lk.D8yF.wjwVJQDCetqQHf0cGBnXx1yihvH.auu', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b358385db93256cc5a9a80d819ee7848.jpg', 'Hello My name is Mahim. I\'m a web developer 😊', 'ms-66c9ca2eb62e51f4599bad', 'true', '2024-01-17 15:04:18'),
(19, 'sajib1boss', 'Sajib', 'Ahmed', 'sajib1boss@gmail.com', '$2y$10$qjycnnqzGKmy9ScatVzOmOidzDUVkJIL2e5XpwtYi4dq4udT6Lcku', 'http://localhost/Mahim-social/backend/files/users/ms_pic-b6cb0735e3432bb742a2a4c9070726b1.jpg', 'Welcome to mahim social media', 'ms-d44e22f6a945f33cc0faca', 'true', '2024-01-21 15:03:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
