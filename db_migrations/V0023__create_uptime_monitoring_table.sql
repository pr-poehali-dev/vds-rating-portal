-- Create uptime monitoring table
CREATE TABLE IF NOT EXISTS provider_uptime (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL,
    check_time TIMESTAMP NOT NULL DEFAULT NOW(),
    is_available BOOLEAN NOT NULL,
    response_time_ms INTEGER,
    status_code INTEGER,
    error_message TEXT,
    CONSTRAINT fk_provider_id CHECK (provider_id > 0)
);

-- Create index for faster queries
CREATE INDEX idx_provider_uptime_provider_id ON provider_uptime(provider_id);
CREATE INDEX idx_provider_uptime_check_time ON provider_uptime(check_time DESC);

-- Create index for uptime calculations
CREATE INDEX idx_provider_uptime_provider_time ON provider_uptime(provider_id, check_time DESC);