-- Reject review from alucard (ID: 4) so it won't be displayed
UPDATE reviews SET status = 'rejected' WHERE id = 4;