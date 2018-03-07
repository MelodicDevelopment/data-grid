/** initialize the grid */
(() => {
	/** get the grid pieces */
	const gridDataArea = document.querySelector('.data-area');
	const gridDataContainer = document.querySelector('.data-container');
	const gridHeaderContainer = document.querySelector('.header-container');
	const gridDataScroller = document.querySelector('.data-container-scroller');
	const gridDataScrollerSpacer = document.querySelector('.data-container-scroller > .spacer');

	/** set the width of the data container scroller spacer */
	gridDataScrollerSpacer.style.width = gridHeaderContainer.scrollWidth + 'px';

	/** add the event listeners */
	gridDataArea.addEventListener('scroll', () => {
		/** check if the scrollTop + gridDataArea height is equal to scrollHeight */
		const bounds = gridDataArea.getClientRects()[0];
		const position = gridDataArea.scrollTop + bounds.height;
		if (position === gridDataArea.scrollHeight) {
			gridDataScroller.style.display = 'none';
		} else {
			gridDataScroller.style.display = 'block';
		}

		// console.log(`${gridDataArea.scrollHeight} | ${gridDataArea.scrollTop} | ${gridDataArea.clientHeight} | ${gridDataArea.clientTop}`);
		// console.log(gridDataArea.getBoundingClientRect());
	});
	gridDataContainer.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		gridHeaderContainer.scrollLeft = gridDataContainer.scrollLeft;
		gridDataScroller.scrollLeft = gridDataContainer.scrollLeft;
	}, { passive: true });
	gridDataScroller.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		gridDataContainer.scrollLeft = gridDataScroller.scrollLeft;
	}, { passive: true });
})();