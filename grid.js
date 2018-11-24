/** grid properties */
const gridProperties = {
	activeCell: -1,
	activeRow: -1
};

/** intialize the grid */
const init = () => {
	/** get the grid pieces */
	const gridDataArea = document.querySelector('.data-area');
	const gridDataContainer = document.querySelector('.data-area .unpinned-column-group');
	const gridHeaderContainer = document.querySelector('.header-area .unpinned-column-group');

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
};

/** add click ability to all cells */
const configureCells = () => {
	/** get the cells */
	const pinnedDataRows = Array.from(document.querySelectorAll('.data-area .pinned-column-group .data-row'));
	const unPinnedDataRows = Array.from(document.querySelectorAll('.data-area .unpinned-column-group .data-row'));

	/** create the data rows */
	const dataRows = [];
	pinnedDataRows.forEach((pdr, i) => {
		/** create cell array */
		const dataRowCells = [].concat(
			Array.from(pdr.querySelectorAll('.cell')),
			Array.from(unPinnedDataRows[i].querySelectorAll('.cell'))
		);
		
		/** add the data row */
		dataRows.push(dataRowCells);
	});

	/** cycle through rows */
	dataRows.forEach((row, i) => {
		/** cycle through cells */
		row.forEach((cell, j) => {
			/** add cell properties */
			cell.setAttribute('tabindex', 0);
			cell.setAttribute('row-index', i);
			cell.setAttribute('cell-index', j);

			/** add click event */
			cell.addEventListener('click', () => {
				/** set active state */
				removeActiveCellState();
				
				/** set the grid active row and cell */
				gridProperties.activeRow = parseInt(cell.getAttribute('row-index'));
				gridProperties.activeCell = parseInt(cell.getAttribute('cell-index'));

				/** set the active cell */
				setActiveCell(cell);
			});

			/** add keyup event */
			cell.addEventListener('keyup', (event) => {
				console.log(event);

				/** check for keycode */
				if (![9, 13, 37, 38, 39, 40].includes(event.keyCode)) return;

				/** remove the active cell state */
				removeActiveCellState();

				/** set the active row and cell */
				if (event.keyCode === 38 && gridProperties.activeRow != 0) gridProperties.activeRow--; // up
				if ([13, 40].includes(event.keyCode) && gridProperties.activeRow < (dataRows.length - 1)) gridProperties.activeRow++; // down
				if (event.keyCode === 37 && gridProperties.activeCell != 0) gridProperties.activeCell--; // left
				if ([9, 39].includes(event.keyCode) && gridProperties.activeCell < (row.length - 1)) gridProperties.activeCell++; // right

				/** find the active cell */
				const newActiveCell = document.querySelector(`.data-area .cell[row-index="${gridProperties.activeRow}"][cell-index="${gridProperties.activeCell}"]`);

				/** set the cell to active */
				setActiveCell(newActiveCell);
			});

			/** kill keydown event to prevent scrolling */
			cell.addEventListener('keydown', (event) => {
				/** check for keycode */
				if ([9, 13, 37, 38, 39, 40].includes(event.keyCode)) {
					event.preventDefault();
					event.stopPropagation();
				}
			});
		});
	});
};

/** remove active class from all cells */
const removeActiveCellState = () => {
	const allCells = Array.from(document.querySelectorAll('.data-area .cell'));
	allCells.forEach(c => c.classList.remove('active'));
};

/** set cell as active */
const setActiveCell = (cell) => {
	/** scroll the cell into view */
	scrollIntoView(cell);

	/** put in setTimeout because something is screwy with scrolling */
	setTimeout(() => {
		/** give the active class to the cell */
		cell.classList.add('active');
		cell.focus();

		/** set focus on the input (if any) */
		const input = cell.querySelector('input');
		if (input) setTimeout(() => {
			/** set the focus */
			input.focus();

			/** on blur change cell value */
			input.addEventListener('blur', () => {
				/** get the span.value */
				const span = cell.querySelector('span.value');
				span.innerText = input.value;
			});
		}, 10);
	}, 10);
};

/** scroll cell into view */
const scrollIntoView = (cell) => {
	/** get the scroll areas */
	const gridDataArea = cell.closest('.data-area');
	const gridDataUnpinned = cell.closest('.unpinned-column-group');

	/** get the bounds of the cell and */
	const gridDataCoords = gridDataArea.getBoundingClientRect();
	const cellCoords = cell.getBoundingClientRect();

	/** check if we're out of view horizontally */
	if (gridDataUnpinned) {
		/** get the unpinned coords */
		const unPinnedCoords = gridDataUnpinned.getBoundingClientRect();

		/** scroll horizontally */
		if (cellCoords.left < unPinnedCoords.left) {
			const diff = (unPinnedCoords.left - cellCoords.left) * -1;
			gridDataUnpinned.scrollBy(diff, 0);
		}
		if (cellCoords.right > unPinnedCoords.right) {
			const diff = cellCoords.right - unPinnedCoords.right;
			gridDataUnpinned.scrollBy(diff, 0);
		}
	}

	/** check if we need to scroll vertically */
	if (cellCoords.top < gridDataCoords.top) {
		const diff = (gridDataCoords.top - cellCoords.top + 1) * -1;
		gridDataArea.scrollBy(0, diff);
	}
	if ((cellCoords.bottom + 18) > gridDataCoords.bottom) {
		const diff = (cellCoords.bottom - gridDataCoords.bottom) + 18;
		gridDataArea.scrollBy(0, diff);
	}
};

/** initialize the grid */
(() => {
	/** initialize the grid */
	init();

	/** configure the cells */
	configureCells();
})();