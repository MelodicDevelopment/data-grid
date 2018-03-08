/** initialize the grid */
(() => {
	/** get the grid pieces */
	const gridDataArea = document.querySelector('.data-area');
	const gridDataContainer = document.querySelector('.data-container');
	const gridHeaderContainer = document.querySelector('.header-container');

	/** add the scroll event listeners */
	gridDataArea.addEventListener('scroll', () => {
		adjustGridArea();
	}, { passive: true });
	gridDataContainer.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		gridHeaderContainer.scrollLeft = gridDataContainer.scrollLeft;
	}, { passive: true });

	/** watch for windows resizes */
	window.addEventListener('resize', () => {
		/** adjust the bottom for the data container */
		gridDataContainer.style.bottom = '0px';
		adjustGridArea();
	});

	/** adjust the bottom of the grid area */
	const adjustGridArea = () => {
		/** calculate the bottom */
		let bottom = gridDataArea.scrollTop * -1;
		const bounds = gridDataArea.getBoundingClientRect();
		const maxBottom = (gridDataArea.scrollHeight - bounds.height) * -1;
		if (maxBottom > bottom) bottom = maxBottom;

		/** adjust the bottom for the data container */
		gridDataContainer.style.bottom = `${bottom}px`;
	};
})();