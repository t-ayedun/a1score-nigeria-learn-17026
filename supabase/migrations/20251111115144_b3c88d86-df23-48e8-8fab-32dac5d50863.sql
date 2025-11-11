-- Secure AI response cache - prevent exposure of sensitive student queries
-- Remove public access policy
DROP POLICY IF EXISTS "Anyone can read from cache" ON public.ai_response_cache;

-- Block all user SELECT access - cache should only be accessed by edge functions using service role
CREATE POLICY "Block direct cache access" 
ON public.ai_response_cache FOR SELECT 
USING (false);

-- Note: Edge functions will continue to work as they use service_role_key which bypasses RLS