DROP DATABASE IF EXISTS locations;
CREATE DATABASE locations;

\c locations;

CREATE TABLE loc (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  latitude INTEGER,
  longitude INTEGER
);

INSERT INTO loc (name, latitude, longitude)
  VALUES ('Oppo', 62.330, 87.000);