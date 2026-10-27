export const SQL_POSTS = `--sql
    CREATE TABLE IF NOT EXISTS posts(
        id VARCHAR(255) NOT NULL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        author_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW,
        CONSTRAINT fk_posts_user
            FOREIGN KEY (author_id)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    )

`;
export interface Post {
  id: string;
  title: string;
  description?: string;
  author_id: string;
  created_at: string;
}
