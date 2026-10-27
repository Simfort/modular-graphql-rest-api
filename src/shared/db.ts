import Database from "better-sqlite3";
import { SQL_USERS } from "../modules/auth/model.js";
import { SQL_POSTS } from "../modules/posts/model.js";

export const db = new Database("test.db");
db.exec(SQL_USERS);
db.exec(SQL_POSTS);

// {
//   "firstname": "David",
//   "lastname": "Lemondzava",
//   "password": "zalupa",
//   "email": "lemonswwsdszasv514r@gmail.com"
// }
