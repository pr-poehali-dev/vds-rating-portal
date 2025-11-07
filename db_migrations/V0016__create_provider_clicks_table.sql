CREATE TABLE IF NOT EXISTS provider_clicks (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL,
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_provider_clicks_provider_id ON provider_clicks(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_clicks_clicked_at ON provider_clicks(clicked_at);
