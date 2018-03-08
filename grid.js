/** initialize the grid */
(() => {
	/** get the grid pieces */
	const gridDataArea = document.querySelector('.data-area');
	const gridDataContainer = document.querySelector('.data-container');
	const gridHeaderContainer = document.querySelector('.header-container');

	/** add the scroll event listeners */
	gridDataArea.addEventListener('scroll', () => {
		gridDataContainer.style.bottom = `${gridDataArea.scrollTop * -1}px`;
	}, { passive: true });
	gridDataContainer.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		gridHeaderContainer.scrollLeft = gridDataContainer.scrollLeft;
	}, { passive: true });
})();