import { clsx, type ClassValue } from 'clsx'
import { GeistSans } from 'geist/font/sans'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fontSans = GeistSans
