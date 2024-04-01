import { writable } from 'svelte/store';

let id = 0;
let toasts = writable([]);

const showToast = (type, message) => {
	id += 1;
	const toast = { id, type, message };
	toasts.update(n => [...n, toast]);

	setTimeout(() => {
		toasts.update(n => n.filter((t) => t.id !== toast.id));
	}, 5000);
};

export { toasts, showToast };