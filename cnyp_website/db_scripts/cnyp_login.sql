create table cnyp_login (
	id INT NOT NULL auto_increment,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB