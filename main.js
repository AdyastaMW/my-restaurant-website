// main.js

import { populateFilters, applyFiltersAndSort, setupFilterSortListeners } from './filterSort.js';
import { setupModalListeners } from './modals.js';
import { setupCommentsListeners } from './comments.js';
import { setupOrderFormListener } from './orderForm.js';

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    applyFiltersAndSort(); // Initial render with default sorting (Best Sellers)
    setupFilterSortListeners();
    setupModalListeners();
    setupCommentsListeners();
    setupOrderFormListener();
});
