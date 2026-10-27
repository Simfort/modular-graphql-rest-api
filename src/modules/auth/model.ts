export const SQL_USERS = `--sql
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) NOT NULL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW
    )

`;

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  created_at: string;
}
