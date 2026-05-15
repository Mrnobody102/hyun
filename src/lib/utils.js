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
		const target = value[language] || value.en || value.vi;
		if (target !== undefined && target !== null) {
			return target;
		}
		
		// If it's a plain object but no lang keys, just stringify it
		if (Object.keys(value).length > 0 && !value.en && !value.vi) {
			return JSON.stringify(value);
		}
	}
	
	return String(value || '');
}