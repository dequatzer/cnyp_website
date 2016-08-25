CREATE TABLE cnyp_profiles (
  `profile_id` int(20) NOT NULL auto_increment,
  `id` int(20) NOT NULL ,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `age` int(2) DEFAULT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `profile_pic` blob,
  primary key (profile_id),
   FOREIGN KEY (id) 
        REFERENCES cnyp_login(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;