-- Secure newsletter_signups table - prevent email harvesting
-- Block all SELECT access until admin role system is implemented
CREATE POLICY "Block newsletter email access" 
ON public.newsletter_signups FOR SELECT 
USING (false);