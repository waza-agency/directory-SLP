-- Actualizar todos los listings existentes para que sean comprables
UPDATE places
SET 
  is_purchasable = true,
  inventory = 10,
  price = CASE 
    WHEN price IS NULL OR price <= 0 THEN 
      CASE 
        WHEN category = 'Technology' THEN 650
        WHEN category = 'Food' THEN 80
        WHEN category = 'Services' THEN 150
        ELSE 100
      END
    ELSE price
  END
WHERE 
  id IS NOT NULL;

-- Verificar los cambios
SELECT id, name, price, inventory, is_purchasable, category FROM places; 