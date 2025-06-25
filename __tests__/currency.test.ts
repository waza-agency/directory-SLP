import { formatMXNPrice, formatMXNPriceCompact } from '@/utils/currency';

describe('Currency Formatting Utils', () => {
  describe('formatMXNPrice', () => {
    it('formats numeric prices correctly', () => {
      expect(formatMXNPrice(1234.56)).toBe('$1,234.56 MXN');
      expect(formatMXNPrice(100)).toBe('$100.00 MXN');
      expect(formatMXNPrice(0.99)).toBe('$0.99 MXN');
    });

    it('formats string prices correctly', () => {
      expect(formatMXNPrice('1234.56')).toBe('$1,234.56 MXN');
      expect(formatMXNPrice('100')).toBe('$100.00 MXN');
      expect(formatMXNPrice('0.99')).toBe('$0.99 MXN');
    });

    it('handles string prices with existing currency symbols', () => {
      expect(formatMXNPrice('$1234.56')).toBe('$1,234.56 MXN');
      expect(formatMXNPrice('$100 MXN')).toBe('$100.00 MXN');
      expect(formatMXNPrice('1,234.56 pesos')).toBe('$1,234.56 MXN');
    });

    it('handles large numbers correctly', () => {
      expect(formatMXNPrice(1000000)).toBe('$1,000,000.00 MXN');
      expect(formatMXNPrice(12345678.90)).toBe('$12,345,678.90 MXN');
    });

    it('handles null and undefined values', () => {
      expect(formatMXNPrice(null)).toBe('');
      expect(formatMXNPrice(undefined)).toBe('');
    });

    it('handles empty string', () => {
      expect(formatMXNPrice('')).toBe('');
    });

    it('handles invalid string values gracefully', () => {
      expect(formatMXNPrice('not a number')).toBe('not a number');
      expect(formatMXNPrice('abc123')).toBe('abc123');
    });

    it('handles negative numbers', () => {
      expect(formatMXNPrice(-100)).toBe('-$100.00 MXN');
      expect(formatMXNPrice('-50.25')).toBe('-$50.25 MXN');
    });
  });

  describe('formatMXNPriceCompact', () => {
    it('formats numeric prices correctly without MXN suffix', () => {
      expect(formatMXNPriceCompact(1234.56)).toBe('$1,234.56');
      expect(formatMXNPriceCompact(100)).toBe('$100.00');
      expect(formatMXNPriceCompact(0.99)).toBe('$0.99');
    });

    it('formats string prices correctly without MXN suffix', () => {
      expect(formatMXNPriceCompact('1234.56')).toBe('$1,234.56');
      expect(formatMXNPriceCompact('100')).toBe('$100.00');
      expect(formatMXNPriceCompact('0.99')).toBe('$0.99');
    });

    it('handles string prices with existing currency symbols', () => {
      expect(formatMXNPriceCompact('$1234.56')).toBe('$1,234.56');
      expect(formatMXNPriceCompact('$100 MXN')).toBe('$100.00');
      expect(formatMXNPriceCompact('1,234.56 pesos')).toBe('$1,234.56');
    });

    it('handles large numbers correctly', () => {
      expect(formatMXNPriceCompact(1000000)).toBe('$1,000,000.00');
      expect(formatMXNPriceCompact(12345678.90)).toBe('$12,345,678.90');
    });

    it('handles null and undefined values', () => {
      expect(formatMXNPriceCompact(null)).toBe('');
      expect(formatMXNPriceCompact(undefined)).toBe('');
    });

    it('handles empty string', () => {
      expect(formatMXNPriceCompact('')).toBe('');
    });

    it('handles invalid string values gracefully', () => {
      expect(formatMXNPriceCompact('not a number')).toBe('not a number');
      expect(formatMXNPriceCompact('abc123')).toBe('abc123');
    });

    it('handles negative numbers', () => {
      expect(formatMXNPriceCompact(-100)).toBe('-$100.00');
      expect(formatMXNPriceCompact('-50.25')).toBe('-$50.25');
    });

    it('always shows two decimal places', () => {
      expect(formatMXNPriceCompact(5)).toBe('$5.00');
      expect(formatMXNPriceCompact(5.5)).toBe('$5.50');
      expect(formatMXNPriceCompact(5.1234)).toBe('$5.12');
    });
  });

  describe('Edge cases', () => {
    it('handles zero values', () => {
      expect(formatMXNPrice(0)).toBe('$0.00 MXN');
      expect(formatMXNPriceCompact(0)).toBe('$0.00');
    });

    it('handles very small numbers', () => {
      expect(formatMXNPrice(0.01)).toBe('$0.01 MXN');
      expect(formatMXNPriceCompact(0.01)).toBe('$0.01');
    });

    it('handles decimal precision correctly', () => {
      expect(formatMXNPrice(123.456)).toBe('$123.46 MXN');
      expect(formatMXNPriceCompact(123.456)).toBe('$123.46');
    });
  });
});