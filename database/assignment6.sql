CREATE TABLE public.message (
    message_id SERIAL PRIMARY KEY,
    message_to INT NOT NULL,
    message_from INT NOT NULL,
    message_subject VARCHAR(255) NOT NULL,
    message_body TEXT NOT NULL,
    message_read BOOLEAN DEFAULT FALSE,
    message_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_message_to FOREIGN KEY (message_to) REFERENCES public.account(account_id),
    CONSTRAINT fk_message_from FOREIGN KEY (message_from) REFERENCES public.account(account_id)
);
