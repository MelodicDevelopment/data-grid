/** initialize the grid */
(() => {
	/** get the grid pieces */
	const gridDataContainer = document.querySelector('.data-container');
	const gridHeaderContainer = document.querySelector('.header-container');

	/** add the scroll event listeners */
	gridDataContainer.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		gridHeaderContainer.scrollLeft = gridDataContainer.scrollLeft;
	}, { passive: true });
})();