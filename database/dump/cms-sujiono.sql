/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : cms-sujiono

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 09/12/2022 00:26:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for adonis_schema
-- ----------------------------
DROP TABLE IF EXISTS `adonis_schema`;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of adonis_schema
-- ----------------------------
BEGIN;
INSERT INTO `adonis_schema` VALUES (1, '1503248427885_user', 1, '2022-12-06 14:31:39');
INSERT INTO `adonis_schema` VALUES (2, '1503248427886_token', 1, '2022-12-06 14:31:39');
COMMIT;

-- ----------------------------
-- Table structure for cms_blogs
-- ----------------------------
DROP TABLE IF EXISTS `cms_blogs`;
CREATE TABLE `cms_blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `narasi` text,
  `date` date DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `kategori` varchar(255) DEFAULT NULL,
  `aktif` enum('Y','N') DEFAULT 'Y',
  `urut` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cms_blogs
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for cms_comments
-- ----------------------------
DROP TABLE IF EXISTS `cms_comments`;
CREATE TABLE `cms_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_id` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `comment` text,
  `status` enum('unpublish','publish') DEFAULT 'unpublish',
  `aktif` enum('Y','N') DEFAULT 'Y',
  `urut` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_blog_idx` (`blog_id`),
  CONSTRAINT `comment_blog_idx` FOREIGN KEY (`blog_id`) REFERENCES `cms_blogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cms_comments
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for cms_visitors
-- ----------------------------
DROP TABLE IF EXISTS `cms_visitors`;
CREATE TABLE `cms_visitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cms_visitors
-- ----------------------------
BEGIN;
INSERT INTO `cms_visitors` VALUES (1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36', '2022-12-05', '2022-12-06 18:20:21', '2022-12-06 18:20:21');
INSERT INTO `cms_visitors` VALUES (2, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36', '2022-12-06', '2022-12-06 18:23:21', '2022-12-06 18:23:21');
INSERT INTO `cms_visitors` VALUES (3, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36', '2022-12-07', '2022-12-07 22:22:49', '2022-12-07 22:22:49');
INSERT INTO `cms_visitors` VALUES (4, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36', '2022-12-08', '2022-12-08 00:06:58', '2022-12-08 00:06:58');
COMMIT;

-- ----------------------------
-- Table structure for sys_options
-- ----------------------------
DROP TABLE IF EXISTS `sys_options`;
CREATE TABLE `sys_options` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(30) NOT NULL,
  `teks` varchar(50) NOT NULL,
  `nilai` varchar(50) NOT NULL,
  `urut` int NOT NULL,
  `status` enum('Y','N') DEFAULT 'Y',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sys_options
-- ----------------------------
BEGIN;
INSERT INTO `sys_options` VALUES (1, 'user-groups', 'Administrator', 'administrator', 1, 'Y', '2021-03-13 16:16:35', '2021-03-13 16:16:35');
INSERT INTO `sys_options` VALUES (2, 'user-groups', 'Wakil Direktur', 'wadir', 3, 'Y', '2021-03-13 16:16:35', '2021-03-13 16:16:35');
INSERT INTO `sys_options` VALUES (3, 'user-groups', 'Finance', 'finance', 4, 'Y', '2021-03-13 16:16:35', '2021-03-13 16:16:35');
INSERT INTO `sys_options` VALUES (4, 'user-groups', 'Operation', 'operation', 7, 'Y', '2021-03-13 16:16:35', '2021-03-13 16:16:35');
INSERT INTO `sys_options` VALUES (5, 'user-groups', 'HRD', 'hrd', 6, 'Y', '2021-03-13 16:16:35', '2021-03-13 16:16:35');
INSERT INTO `sys_options` VALUES (6, 'user-groups', 'Logistik', 'logistik', 5, 'Y', '2021-03-13 16:16:35', '2021-03-13 16:16:35');
INSERT INTO `sys_options` VALUES (7, 'jenkel', 'Pilih Jenkel', '-', 1, 'Y', NULL, NULL);
INSERT INTO `sys_options` VALUES (8, 'jenkel', 'Laki-laki', 'L', 2, 'Y', '2021-02-21 03:30:03', '2021-02-21 04:14:07');
INSERT INTO `sys_options` VALUES (9, 'jenkel', 'Perempuan', 'P', 3, 'Y', '2021-02-21 03:30:30', '2021-02-21 04:14:11');
COMMIT;

-- ----------------------------
-- Table structure for tokens
-- ----------------------------
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unique` (`token`),
  KEY `tokens_user_id_foreign` (`user_id`),
  KEY `tokens_token_index` (`token`),
  CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tokens
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `usertype` varchar(255) DEFAULT 'editor',
  `aktif` enum('Y','N') DEFAULT 'Y',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'dev', 'ayat.ekapoetra@gmail.com', '$2a$10$IA0FY/lHJG9z1mAbHjoRPeKiq8lkHuDN/d.E/3QnzBl.gBzwl34wC', 'admin', 'Y', '2022-12-06 14:41:10', '2022-12-06 14:41:10');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
