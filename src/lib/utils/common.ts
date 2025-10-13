/**
 * Common utility functions
 */

/**
 * Sleep function for delays
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
