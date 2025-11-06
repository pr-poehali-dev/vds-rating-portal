CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL,
    author VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_provider_id ON reviews(provider_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);