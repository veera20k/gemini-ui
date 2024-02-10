import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUid = () => {
  const randomBytes = crypto.randomBytes(10);
  return randomBytes.toString('hex');
}

export const generateRandomUsername = () => {
  const adjectives = ['happy', 'creative', 'awesome', 'sunny', 'lucky'];
  const nouns = ['unicorn', 'explorer', 'developer', 'star', 'wizard'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const capitalizedAdjective = randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1);
  const capitalizedNoun = randomNoun.charAt(0).toUpperCase() + randomNoun.slice(1);
  const randomUsername = capitalizedAdjective + capitalizedNoun;
  return randomUsername;
};
