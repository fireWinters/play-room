CREATE TABLE `az_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL COMMENT '用户昵称',
  `level` tinyint(4) NOT NULL COMMENT '用户等级',
  `password` char(64) NOT NULL COMMENT '密码',
  `create_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `delele_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE `az_user_temporary` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL COMMENT '用户昵称',
  `level` tinyint(4) NOT NULL COMMENT '用户等级',
  `password` char(64) NOT NULL COMMENT '密码',
  `create_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `delele_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;