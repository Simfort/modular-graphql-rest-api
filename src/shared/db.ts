import Database from "better-sqlite3";
import { SQL_USERS } from "../modules/auth/model.js";

export const db = new Database("test.db");
db.exec(SQL_USERS);
