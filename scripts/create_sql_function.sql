-- Function to update a text field in any table
-- This needs to be run against your Supabase database
CREATE OR REPLACE FUNCTION update_text_field(
    table_name TEXT, 
    column_name TEXT, 
    new_value TEXT, 
    row_id UUID
)
RETURNS VOID AS $$
DECLARE
    sql_statement TEXT;
BEGIN
    -- Create dynamic SQL statement
    sql_statement := format('UPDATE %I SET %I = %L WHERE id = %L', 
                          table_name, 
                          column_name, 
                          new_value, 
                          row_id);
    
    -- Execute the statement
    EXECUTE sql_statement;
    
    RAISE NOTICE 'Updated % in % table for row ID %', column_name, table_name, row_id;
END;
$$ LANGUAGE plpgsql; 