-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 04, 2023 at 05:06 PM
-- Server version: 10.5.19-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u641427100_breakdownbuddy`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `mech_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `created_on` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `completed_on` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `remark` text NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `mech_id`, `user_id`, `created_on`, `status`, `completed_on`, `amount`, `remark`, `latitude`, `longitude`) VALUES
(1, '2', '1', '2023-08-19 12:36:07', 'Completed', '2023-09-03 13:16:21', '', '', '13.0386555', '77.6224229'),
(2, '4', '1', '2023-08-19 12:36:08', 'Pending', '', '', '', '13.0386555', '77.6224229'),
(3, '5', '1', '2023-08-19 12:36:09', 'Completed', '2023-08-19 15:04:37', '', '', '13.0386555', '77.6224229'),
(4, '5', '1', '2023-08-19 12:36:10', 'Current', '2023-08-19 13:46:43', '', '', '13.0386555', '77.6224229'),
(5, '4', '1', '2023-08-19 12:36:10', 'Completed', '2023-08-19 15:02:11', '', '', '13.0386555', '77.6224229'),
(6, '2', '1', '2023-08-19 12:36:11', 'Pending', '', '', '', '13.0386555', '77.6224229'),
(7, '2', '1', '2023-08-19 15:06:27', 'Current', '2023-08-19 15:07:26', '', '', '13.0386555', '77.6224229'),
(8, '4', '1', '2023-08-19 15:06:28', 'Pending', '', '', '', '13.0386555', '77.6224229'),
(9, '5', '1', '2023-08-19 15:06:28', 'Pending', '', '', '', '13.0386555', '77.6224229'),
(10, '2', '1', '2023-08-19 18:22:13', 'Pending', '', '', '', '13.0386555', '77.6224229'),
(11, '5', '7', '2023-08-22 16:13:48', 'Pending', '', '', '', '18.585045166950117', '73.74040459947088'),
(12, '8', '9', '2023-08-30 16:53:02', 'Pending', '', '', '', '18.58500181186944', '73.74018201732937'),
(13, '2', '10', '2023-08-31 16:40:18', 'Pending', '', '', '', '18.58500181186944', '73.74018201732937'),
(14, '2', '1', '2023-09-03 13:15:26', 'Pending', '', '', '', '13.038678', '77.6223998');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `dob` varchar(100) NOT NULL,
  `usertype` varchar(100) NOT NULL,
  `upi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `mobile`, `password`, `email`, `address`, `dob`, `usertype`, `upi`) VALUES
(1, 'lalit', '9657256675', '123', 'lalit@gmail.com', 'Bengalore', '14-07-1993', 'user', '9657256675@paytm'),
(2, 'suraj', '9898989898', '123', 'suraj@gmail.com', 'Bengalore', '11-08-1994', 'mechanic', '9657256675@paytm'),
(3, 'Admin', 'admin', 'admin', 'admin@gmail.com', 'bengalore', '', 'admin', ''),
(4, 'Mayur11', '9999999999', '123', 'mayur@gmail.com', 'bengalore', '', 'mechanic', ''),
(5, 'Amar', '8888888888', '123', 'amar@gmail.com', 'Bengalore', '', 'mechanic', ''),
(6, 'gauri', '8596067453', '1234', 'gauri@gmail.com', 'pune', '01/01/2000', 'user', ''),
(7, 'shruti', '1234567890', '123', 'shruti@gmail.com', 'pune', '01/01/2000', 'user', ''),
(8, 'rani', '0987654321', '1234', 'rani@gmail.com', 'pune', '2/3/1999', 'mechanic', ''),
(9, 'gauri', '9637872353', '1234', 'gauri@gmail.com', 'hinjewadi, pune', '1/1/2000', 'user', ''),
(10, 'shruti', '8180969404', '1234', 'shruti@gmail.com', 'nagpur', '31/05/2000', 'user', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
