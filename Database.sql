CREATE TABLE   `Login` (
  `personID` int(6) NOT NULL UNIQUE AUTO_INCREMENT,
  `Username` varchar(15) NOT NULL,
  `Password` varchar(20) NOT NULL,
  PRIMARY KEY(`personID`)
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
