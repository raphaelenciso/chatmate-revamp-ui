/**
 * Utility functions for generating random avatars using DiceBear HTTP API
 */

// Available avatar styles from DiceBear
export type AvatarStyle =
  | 'lorelei'
  | 'lorelei-neutral'
  | 'avataaars'
  | 'avataaars-neutral'
  | 'bottts'
  | 'bottts-neutral'
  | 'pixel-art'
  | 'pixel-art-neutral'
  | 'adventurer'
  | 'adventurer-neutral'
  | 'big-ears'
  | 'big-ears-neutral'
  | 'micah'
  | 'miniavs'
  | 'personas';

// Available image formats
export type ImageFormat = 'svg' | 'png' | 'jpg' | 'webp' | 'avif';

// Available background colors (hex without #)
const BACKGROUND_COLORS = [
  'b6e3f4', // Light blue
  'c0aede', // Light purple
  'd1d4f9', // Light lavender
  'e28743', // Orange
  'f1c27d', // Light orange
  'ffad9f', // Light pink
  'c5e4e7', // Light teal
  'd4edda', // Light green
  'f8f9fa', // Light gray
  'ffeaa7', // Light yellow
];

/**
 * Generates a random string to use as a seed for avatar generation
 */
const generateRandomSeed = (): string => {
  return (
    Math.random().toString(36).slice(2, 15) +
    Math.random().toString(36).slice(2, 15)
  );
};

/**
 * Gets a random background color from the predefined palette
 */
const getRandomBackgroundColor = (): string => {
  return BACKGROUND_COLORS[
    Math.floor(Math.random() * BACKGROUND_COLORS.length)
  ];
};

/**
 * Generates a random avatar URL using DiceBear's HTTP API
 *
 * @param style - The avatar style to use (default: 'lorelei')
 * @param format - The image format (default: 'svg')
 * @param customSeed - Optional custom seed for consistent avatars
 * @param backgroundColor - Optional background color (hex without #)
 * @returns The public URL for the generated avatar
 */
export const generateRandomAvatarUrl = (
  style: AvatarStyle = 'lorelei',
  format: ImageFormat = 'svg',
  customSeed?: string,
  backgroundColor?: string
): string => {
  const seed = customSeed || generateRandomSeed();
  const bgColor = backgroundColor || getRandomBackgroundColor();

  const baseUrl = `https://api.dicebear.com/9.x/${style}/${format}`;
  const params = new URLSearchParams({
    seed,
    backgroundColor: bgColor,
    radius: '50', // Rounded corners
    size: '128', // Size in pixels
  });

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Generates a consistent avatar URL based on a user identifier (like email or username)
 * This ensures the same user always gets the same avatar
 *
 * @param userIdentifier - A unique identifier for the user (email, username, etc.)
 * @param style - The avatar style to use (default: 'lorelei')
 * @param format - The image format (default: 'svg')
 * @returns The public URL for the generated avatar
 */
export const generateUserAvatarUrl = (
  userIdentifier: string,
  style: AvatarStyle = 'lorelei',
  format: ImageFormat = 'svg'
): string => {
  // Use a hash of the identifier to ensure consistency while still getting variety
  const seed = btoa(userIdentifier)
    .replaceAll(/[^\dA-Za-z]/g, '')
    .toLowerCase();
  const backgroundColor = getRandomBackgroundColor();

  return generateRandomAvatarUrl(style, format, seed, backgroundColor);
};

/**
 * Generates multiple random avatar URLs for selection
 *
 * @param count - Number of avatars to generate (default: 5)
 * @param style - The avatar style to use (default: 'lorelei')
 * @param format - The image format (default: 'svg')
 * @returns Array of avatar URLs
 */
export const generateAvatarOptions = (
  count: number = 5,
  style: AvatarStyle = 'lorelei',
  format: ImageFormat = 'svg'
): string[] => {
  return Array.from({ length: count }, () =>
    generateRandomAvatarUrl(style, format)
  );
};
