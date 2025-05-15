
/**
 * Generates a unique ID for diagnostic results sharing
 * Format: diag-{timestamp}-{random}
 */
export const generateUniqueId = (): string => {
  return `diag-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
