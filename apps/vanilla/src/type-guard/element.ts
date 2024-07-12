/**
 * Check if the element is a HTML element.
 * @param node The node which needs to be checked.
 * @returns The element is a HTMLElement.
 */
export function isHTMLElement(node: ChildNode | null): node is HTMLElement {
	return node?.nodeType === Node.ELEMENT_NODE;
}
