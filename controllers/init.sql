CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price NUMERIC,
  quantity INTEGER,
  unit_price NUMERIC,
  merchandizer VARCHAR(100),
  date TIMESTAMP
);