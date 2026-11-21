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

-- Entry tables: each row belongs to one trip (trip_id), and each trip belongs
-- to one user (trips.user_id). Columns mirror the manual entry forms in
-- src/pages/Dashboard.jsx. Dates and times are stored separately as the local
-- time at that place, which is how travelers read itineraries.

CREATE TABLE IF NOT EXISTS transportation (
    id              SERIAL PRIMARY KEY,
    trip_id         INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    type            TEXT,
    depart_location TEXT,
    arrive_location TEXT,
    depart_date     DATE,
    depart_time     TIME,
    arrive_date     DATE,
    arrive_time     TIME,
    cost            NUMERIC(10, 2),
    confirmation    TEXT
);

CREATE TABLE IF NOT EXISTS accommodations (
    id             SERIAL PRIMARY KEY,
    trip_id        INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    name           TEXT,
    street_address TEXT,
    address_line_2 TEXT,
    city           TEXT,
    state_province TEXT,
    zip_code       TEXT,
    country        TEXT,
    check_in       DATE,
    check_out      DATE,
    cost           NUMERIC(10, 2),
    confirmation   TEXT
);

CREATE TABLE IF NOT EXISTS activities (
    id         SERIAL PRIMARY KEY,
    trip_id    INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    name       TEXT,
    location   TEXT,
    date       DATE,
    start_time TIME,
    end_time   TIME,
    cost       NUMERIC(10, 2),
    notes      TEXT
);

-- Postgres doesn't index foreign keys automatically; these make
-- "all trips for a user" and "all entries for a trip" lookups fast.
CREATE INDEX IF NOT EXISTS trips_user_id_idx          ON trips (user_id);
CREATE INDEX IF NOT EXISTS transportation_trip_id_idx ON transportation (trip_id);
CREATE INDEX IF NOT EXISTS accommodations_trip_id_idx ON accommodations (trip_id);
CREATE INDEX IF NOT EXISTS activities_trip_id_idx     ON activities (trip_id);
