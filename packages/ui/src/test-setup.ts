// jsdom lacks these browser APIs, which Mantine components use
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => undefined,
		removeListener: () => undefined,
		addEventListener: () => undefined,
		removeEventListener: () => undefined,
		dispatchEvent: () => false,
	}),
});

window.ResizeObserver = class {
	observe = () => undefined;
	unobserve = () => undefined;
	disconnect = () => undefined;
};
