CREATE TABLE IF NOT EXISTS phrases (
	language		TEXT	NOT NULL,
	page			TEXT	NOT NULL,
	section		TEXT	NOT NULL,
	key			TEXT	NOT NULL,
	phrase		TEXT	NOT NULL,

	PRIMARY KEY (language, page, section, key)
);
CREATE INDEX IF NOT EXISTS idx_phrases_language ON phrases(language);
CREATE INDEX IF NOT EXISTS idx_phrases_page ON phrases(page);
CREATE INDEX IF NOT EXISTS idx_phrases_section ON phrases(section);
CREATE INDEX IF NOT EXISTS idx_phrases_key ON phrases(key);
