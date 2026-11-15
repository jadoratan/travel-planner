CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    username   TEXT NOT NULL UNIQUE,
    password   TEXT NOT NULL,
    dob        DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS trips (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    destination TEXT,
    start_date  DATE,
    end_date    DATE
);

CREATE TABLE IF NOT EXISTS transportation (
    id              SERIAL PRIMARY KEY,
    trip_id         INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    type            TEXT,
    depart_location TEXT,
    arrive_location TEXT,
    depart_time     TIMESTAMP,
    arrive_time     TIMESTAMP,
    confirmation    TEXT
);

CREATE TABLE IF NOT EXISTS accommodations (
    id           SERIAL PRIMARY KEY,
    trip_id      INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    name         TEXT,
    address      TEXT,
    check_in     DATE,
    check_out    DATE,
    confirmation TEXT
);

CREATE TABLE IF NOT EXISTS activities (
    id         SERIAL PRIMARY KEY,
    trip_id    INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    name       TEXT,
    location   TEXT,
    start_time TIMESTAMP,
    notes      TEXT
);
