/**
 * Formats a price value to Mexican peso currency format
 * @param price - The price value (can be string or number)
 * @returns Formatted price string like "$1,234.00 MXN"
 */
export function formatMXNPrice(price: string | number | null | undefined): string {
  if (!price) return '';

  // Convert to number if it's a string
  let numericPrice: number;

  if (typeof price === 'string') {
    // Remove any existing currency symbols and non-numeric characters except decimal point
    const cleanPrice = price.replace(/[^\d.-]/g, '');
    numericPrice = parseFloat(cleanPrice);
  } else {
    numericPrice = price;
  }

  // Check if the conversion resulted in a valid number
  if (isNaN(numericPrice)) {
    return price.toString(); // Return original if we can't parse it
  }

  // Format the number with Mexican peso currency formatting
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(numericPrice);
}

/**
 * Formats a price value for display in listing cards (compact format)
 * @param price - The price value (can be string or number)
 * @returns Formatted price string like "$1,234.00"
 */
export function formatMXNPriceCompact(price: string | number | null | undefined): string {
  if (!price) return '';

  // Convert to number if it's a string
  let numericPrice: number;

  if (typeof price === 'string') {
    // Remove any existing currency symbols and non-numeric characters except decimal point
    const cleanPrice = price.replace(/[^\d.-]/g, '');
    numericPrice = parseFloat(cleanPrice);
  } else {
    numericPrice = price;
  }

  // Check if the conversion resulted in a valid number
  if (isNaN(numericPrice)) {
    return price.toString(); // Return original if we can't parse it
  }

  // Format the number with peso symbol and .00 decimals
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol'
  });

  // Remove "MXN" from the end and return just the symbol and amount
  return formatter.format(numericPrice).replace(/\s*MXN$/, '');
}