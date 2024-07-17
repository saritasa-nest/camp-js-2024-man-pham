/**
 * Check if the element is a button.
 * @param element The element which needs to be checked.
 * @returns The element is a HTMLButtonElement.
 */
export function isButtonElement(element: HTMLElement | null): element is HTMLButtonElement {
	return element?.tagName.toLowerCase() === 'button';
}
