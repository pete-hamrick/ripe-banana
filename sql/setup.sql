DROP TABLE IF EXISTS reviewers CASCADE;
DROP TABLE IF EXISTS studios CASCADE;
DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS film_actor;


CREATE TABLE reviewers (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

CREATE TABLE studios (
    studio_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL
);

CREATE TABLE actors (
    actor_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    pob TEXT
);

CREATE TABLE films (
    film_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    released INTEGER NOT NULL,
    studio_id BIGINT NOT NULL,
    FOREIGN KEY (studio_id) references studios(studio_id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INTEGER NOT NULL,
    review VARCHAR(140) NOT NULL,
    reviewer_id BIGINT NOT NULL,
    FOREIGN KEY (reviewer_id) references reviewers(reviewer_id),
    film_id BIGINT NOT NULL,
    FOREIGN KEY (film_id) references films(film_id)
);

CREATE TABLE film_actor (
    actor_id BIGINT,
    film_id BIGINT
);
