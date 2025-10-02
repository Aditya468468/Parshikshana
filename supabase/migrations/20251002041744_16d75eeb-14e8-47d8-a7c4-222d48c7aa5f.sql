-- Fix security definer view by enabling security invoker mode
ALTER VIEW public.mentor_workload SET (security_invoker = on);