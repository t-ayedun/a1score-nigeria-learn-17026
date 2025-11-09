-- Create enum for request status
CREATE TYPE public.request_status AS ENUM ('pending', 'accepted', 'declined');

-- Create message_requests table
CREATE TABLE public.message_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  status request_status NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(sender_id, receiver_id)
);

-- Create user_connections table for accepted connections
CREATE TABLE public.user_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id UUID NOT NULL,
  user2_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user1_id, user2_id),
  CHECK (user1_id < user2_id) -- Ensure consistent ordering
);

-- Enable RLS
ALTER TABLE public.message_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for message_requests
CREATE POLICY "Users can view their own requests"
ON public.message_requests
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send requests"
ON public.message_requests
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update requests they received"
ON public.message_requests
FOR UPDATE
USING (auth.uid() = receiver_id);

-- RLS Policies for user_connections
CREATE POLICY "Users can view their connections"
ON public.user_connections
FOR SELECT
USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "System can create connections"
ON public.user_connections
FOR INSERT
WITH CHECK (true); -- Will be controlled by edge functions

-- Add triggers for updated_at
CREATE TRIGGER update_message_requests_updated_at
BEFORE UPDATE ON public.message_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create connection when request is accepted
CREATE OR REPLACE FUNCTION public.handle_accepted_request()
RETURNS TRIGGER AS $$
BEGIN
  -- If request was just accepted, create connection
  IF NEW.status = 'accepted' AND OLD.status = 'pending' THEN
    INSERT INTO public.user_connections (user1_id, user2_id)
    VALUES (
      LEAST(NEW.sender_id, NEW.receiver_id),
      GREATEST(NEW.sender_id, NEW.receiver_id)
    )
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create connections
CREATE TRIGGER on_request_accepted
AFTER UPDATE ON public.message_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_accepted_request();