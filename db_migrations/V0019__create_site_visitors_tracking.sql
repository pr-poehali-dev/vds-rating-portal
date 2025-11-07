-- Create table for tracking unique site visitors
CREATE TABLE IF NOT EXISTS site_visitors (
    id SERIAL PRIMARY KEY,
    user_ip VARCHAR(45) NOT NULL UNIQUE,
    first_visit TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_visit TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    visit_count INTEGER DEFAULT 1
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_site_visitors_ip ON site_visitors(user_ip);
CREATE INDEX IF NOT EXISTS idx_site_visitors_first_visit ON site_visitors(first_visit);