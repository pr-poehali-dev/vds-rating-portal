CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES admin_users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_tokens_token ON admin_tokens(token);
CREATE INDEX IF NOT EXISTS idx_admin_tokens_user_id ON admin_tokens(user_id);

INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', 'b8c6c8ed2e9d6d78c63891b88ca99c34a3b3cfdb37e0ec45b37c1b6e16dd0a09')
ON CONFLICT (username) DO NOTHING;