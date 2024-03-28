CREATE DATABASE hdblog;

CREATE TABLE post (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  text TEXT,
  date TIMESTAMP
);

CREATE TABLE event (
  event_id VARCHAR,
  post_id VARCHAR(255) REFERENCES post(id),
  date TIMESTAMP,
  place VARCHAR(255),
  event_text TEXT
);