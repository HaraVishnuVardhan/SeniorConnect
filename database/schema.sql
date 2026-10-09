CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    roll_no VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE doubts (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    status VARCHAR(50),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    asked_by INTEGER NOT NULL,
    sent_to INTEGER NOT NULL,

    FOREIGN KEY (asked_by) REFERENCES users(id),
    FOREIGN KEY (sent_to) REFERENCES users(id)
);
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    answer_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    answered_by INTEGER NOT NULL,
    doubt_id INTEGER NOT NULL,

    FOREIGN KEY (answered_by) RE0FERENCES users(id),
    FOREIGN KEY (doubt_id) REFERENCES doubts(id)
);
CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    uploaded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    doubt_id INTEGER,
    answer_id INTEGER,

    FOREIGN KEY (doubt_id) REFERENCES doubts(id),
    FOREIGN KEY (answer_id) REFERENCES answers(id)
);
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    resource_type VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    uploaded_by INTEGER NOT NULL,

    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);


