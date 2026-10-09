INSERT INTO users (roll_no, name, password_hash)
VALUES
('AM.EN.U4ELC23001', 'midhun', 'sample_hash_1'),
('AM.EN.U4ELC240049', 'Vishnu', 'sample_hash_2'),
('AM.EN.U4ELC25001', 'priya', 'sample_hash_3'),
('AM.EN.U4ELC26001', 'pidakala Ravi', 'sample_hash_4');
INSERT INTO doubts (question_text, status, asked_by, sent_to)
VALUES
('Can someone explain normalization?', 'open', 3, 2),
('How should I prepare for DBMS exam?', 'open', 4, 1);
INSERT INTO answers (answer_text, answered_by, doubt_id)
VALUES
('Start with 1NF, then understand functional dependencies.', 2, 1);
INSERT INTO resources (title, description, resource_type, file_url, uploaded_by)
VALUES
(
    'DBMS Previous Year Questions',
    'Collection of DBMS PYQs for exam preparation',
    'pdf',
    'https://example.com/dbms-pyqs.pdf',
    1
),
(
    'Operating Systems Notes',
    'Unit-wise OS notes',
    'pdf',
    'https://example.com/os-notes.pdf',
    2
);
INSERT INTO attachments (filename, file_url, file_type, doubt_id)
VALUES
(
    'normalization_question.pdf',
    'https://example.com/normalization.pdf',
    'pdf',
    1
);
INSERT INTO attachments (filename, file_url, file_type, answer_id)
VALUES
(
    'normalization_notes.pdf',
    'https://example.com/normalization-notes.pdf',
    'pdf',
    1
);
