import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.SUPABASE_URL || "https://xubhvmitsqvfvqqerkjn.supabase.co";
const supabaseUrl = rawUrl.startsWith("http") ? rawUrl : "https://xubhvmitsqvfvqqerkjn.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Ymh2bWl0c3F2ZnZxcWVya2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3Mjk5MzgsImV4cCI6MjEwMjMwNTkzOH0.00SduXELUO6mEQNb5K8NA30cLp8dDnix3JggEEWYAxQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
