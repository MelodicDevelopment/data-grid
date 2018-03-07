/** initialize the grid */
(() => {
	/** get the grid pieces */
	const gridDataContainer = document.querySelector('.data-container');
	const gridHeaderContainer = document.querySelector('.header-container');
	const gridLeftDataColumn = document.querySelector('.data-area .left-pinned-columns');

	/** track the active side */
	let leftActive = false;

	/** add the scroll event listeners */
	gridDataContainer.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		gridHeaderContainer.scrollLeft = gridDataContainer.scrollLeft;
		if (!leftActive) {
			gridLeftDataColumn.scrollTop = gridDataContainer.scrollTop;
		}
	}, { passive: true });
	gridLeftDataColumn.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		if (leftActive) {
			gridDataContainer.scrollTop = gridLeftDataColumn.scrollTop;
		}
	}, { passive: true });

	/** add mouseover event listeners */
	gridDataContainer.addEventListener('mouseover', () => {
		leftActive = false;
	}, { passive: true });
	gridLeftDataColumn.addEventListener('mouseover', () => {
		leftActive = true;
	}, { passive: true });
})();