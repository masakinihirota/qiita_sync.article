// CREATE TABLE users (
//   id INT PRIMARY KEY,
//   username VARCHAR(50) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL
// );
type User = {
  id: number;
  username: string;
  password: string;
  email: string;
};
