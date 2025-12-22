import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Resolve bilingual text objects { en, vi } or plain strings
export function t(value, language = 'en') {
	if (value === null || value === undefined) return '';
	if (typeof value === 'string') return value;
	if (typeof value === 'object') {
		if (value[language]) return value[language];
		return value.en || value.vi || '';
	}
	return String(value);
}