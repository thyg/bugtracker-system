CREATE TABLE IF NOT EXISTS bugs (
    id BIGSERIAL PRIMARY KEY,
    project_key VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    message TEXT,
    exception JSONB,
    contexts JSONB,
    tags JSONB,
    event_timestamp TIMESTAMPTZ,
    received_at TIMESTAMPTZ NOT NULL
);