import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hmadcpgayfeaxwmumzlq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtYWRjcGdheWZlYXh3bXVtemxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3NzMzMDIsImV4cCI6MjAzMjM0OTMwMn0.TDfFd9ZzPHNjrfcaL2PJbVRSen8blx_MHdFqtnm2Ws8';

export const supabase = createClient(supabaseUrl, supabaseKey);
