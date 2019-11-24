CREATE TABLE   `login` (
  `personID` int(6) NOT NULL UNIQUE AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY(`personID`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
