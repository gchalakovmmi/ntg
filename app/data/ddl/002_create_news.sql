-- News database schema for multi-language news articles
-- This table stores news articles with metadata and content in multiple languages
CREATE TABLE news (
	language TEXT NOT NULL CHECK(language IN ('bg', 'en', 'de', 'fr', 'es')),
	category TEXT NOT NULL  CHECK(category IN ('SL', 'EP')),
	upload_date DATE NOT NULL,
	title TEXT NOT NULL,
	short_description TEXT NOT NULL,
	long_description TEXT,
	slug TEXT NOT NULL,
	image_url TEXT,
	PRIMARY KEY (language, slug)
);



-- Indexes for efficient searching
-- CREATE INDEX idx_news_id ON news(id);
CREATE INDEX idx_news_language ON news(language);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_upload_date ON news(upload_date);
CREATE INDEX idx_news_title ON news(title);
CREATE INDEX idx_news_short_description ON news(short_description);
CREATE INDEX idx_news_slug ON news(slug);

-- For full-text search capabilities (optional)
CREATE VIRTUAL TABLE IF NOT EXISTS news_fts USING fts5(
	title,
	short_description,
	long_description,
	content='news',
	content_rowid='id'
);
