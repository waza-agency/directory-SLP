-- Function to execute raw SQL queries
-- This needs to be run against your Supabase database
CREATE OR REPLACE FUNCTION execute_raw_query(
    sql_query TEXT,
    params TEXT[] DEFAULT ARRAY[]::TEXT[]
)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    EXECUTE sql_query INTO result USING params;
    RETURN result;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error executing query: %', SQLERRM;
    RETURN jsonb_build_object('error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 