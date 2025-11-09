-- Fix RLS policies to require authentication

-- Drop existing policies for message_requests
DROP POLICY "Users can view their own requests" ON public.message_requests;
DROP POLICY "Users can send requests" ON public.message_requests;
DROP POLICY "Users can update requests they received" ON public.message_requests;

-- Drop existing policies for user_connections
DROP POLICY "Users can view their connections" ON public.user_connections;

-- Create new policies that require authentication
CREATE POLICY "Authenticated users can view their own requests"
ON public.message_requests
FOR SELECT
TO authenticated
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Authenticated users can send requests"
ON public.message_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Authenticated users can update requests they received"
ON public.message_requests
FOR UPDATE
TO authenticated
USING (auth.uid() = receiver_id);

CREATE POLICY "Authenticated users can view their connections"
ON public.user_connections
FOR SELECT
TO authenticated
USING (auth.uid() = user1_id OR auth.uid() = user2_id);