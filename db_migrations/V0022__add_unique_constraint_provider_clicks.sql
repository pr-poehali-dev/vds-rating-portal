-- Create unique index to prevent duplicate clicks from same IP for same provider
-- This will enforce deduplication going forward
CREATE UNIQUE INDEX IF NOT EXISTS idx_provider_clicks_unique 
ON t_p4153566_vds_rating_portal.provider_clicks(provider_id, user_ip);