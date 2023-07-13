SELECT *
FROM public."Queues"
WHERE status = 'Completed';


UPDATE public."Queues"
SET status = 'Pending'
WHERE id = '7ea01ce5-9d27-4768-be86-8ae57ad4c1c0';