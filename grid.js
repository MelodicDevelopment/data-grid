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

	/** create flag to track horizontal scrolling */
	let isScrolling;

	/** add the scroll event listeners */
	gridDataArea.addEventListener('scroll', () => {
		/** check if the scrollTop + gridDataArea height is equal to scrollHeight */
		const bounds = gridDataArea.getClientRects()[0];
		const position = gridDataArea.scrollTop + bounds.height;
		if (position === gridDataArea.scrollHeight) {
			gridDataScroller.style.visibility = 'hidden';
		} else {
			gridDataScroller.style.visibility = 'visible';
		}
	});
	gridDataContainer.addEventListener('scroll', () => {
		/** scroll the other grid pieces */
		gridHeaderContainer.scrollLeft = gridDataContainer.scrollLeft;
		gridDataScroller.scrollLeft = gridDataContainer.scrollLeft;
	}, { passive: true });
	gridDataScroller.addEventListener('scroll', () => {
		/** clear the isScrolling timeout and reset */
		clearTimeout(isScrolling);
		isScrolling = setTimeout(syncScrollLeft.bind(null, gridDataScroller, gridDataContainer), 50);
	}, { passive: true });

	/** sync the scrollLeft values */
	const syncScrollLeft = (primary, secondary) => {
		secondary.scrollLeft = primary.scrollLeft;
	};
})();