-- Add user_ip column to track unique users
ALTER TABLE provider_clicks ADD COLUMN IF NOT EXISTS user_ip VARCHAR(45);

-- Create unique index to prevent duplicate clicks from same IP for same provider
CREATE UNIQUE INDEX IF NOT EXISTS idx_provider_clicks_unique_user 
ON provider_clicks(provider_id, user_ip);