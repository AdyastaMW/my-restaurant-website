// filterSort.js

import { watches, generateDummyWatches } from './data.js';
import { dom } from './domElements.js';
import { renderProducts } from './productRender.js';

// Add dummy watches to the main watches array
watches.push(...generateDummyWatches(63));

// Populate filter options dynamically
export function populateFilters() {
    const brands = [...new Set(watches.map(watch => watch.brand))].sort();
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        dom.filterBrandSelect.appendChild(option);
    });
}

// Filter and Sort Logic
export function applyFiltersAndSort() {
    let filteredWatches = [...watches];

    // Search
    const searchTerm = dom.searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filteredWatches = filteredWatches.filter(watch =>
            watch.name.toLowerCase().includes(searchTerm) ||
            watch.brand.toLowerCase().includes(searchTerm) ||
            watch.type.toLowerCase().includes(searchTerm)
        );
    }

    // Filters
    const selectedBrand = dom.filterBrandSelect.value;
    if (selectedBrand) {
        filteredWatches = filteredWatches.filter(watch => watch.brand === selectedBrand);
    }

    const selectedPriceRange = dom.filterPriceSelect.value;
    if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split('-').map(Number);
        filteredWatches = filteredWatches.filter(watch => watch.price >= min && watch.price <= max);
    }

    const selectedType = dom.filterTypeSelect.value;
    if (selectedType) {
        filteredWatches = filteredWatches.filter(watch => watch.type === selectedType);
    }

    const selectedColor = dom.filterColorSelect.value;
    if (selectedColor) {
        filteredWatches = filteredWatches.filter(watch => watch.color === selectedColor);
    }

    const selectedCaseMaterial = dom.filterCaseMaterialSelect.value;
    if (selectedCaseMaterial) {
        filteredWatches = filteredWatches.filter(watch => watch.caseMaterial === selectedCaseMaterial);
    }

    const selectedStrapType = dom.filterStrapTypeSelect.value;
    if (selectedStrapType) {
        filteredWatches = filteredWatches.filter(watch => watch.strapType === selectedStrapType);
    }

    const filterNew = dom.filterNewCheckbox.checked;
    const filterUsed = dom.filterUsedCheckbox.checked;

    if (filterNew && !filterUsed) {
        filteredWatches = filteredWatches.filter(watch => watch.status === 'New');
    } else if (!filterNew && filterUsed) {
        filteredWatches = filteredWatches.filter(watch => watch.status === 'Used');
    } else if (!filterNew && !filterUsed) {
        // If neither is checked, show all (no filter applied by status)
    }

    const filterDiscount = dom.filterDiscountCheckbox.checked;
    if (filterDiscount) {
        filteredWatches = filteredWatches.filter(watch => watch.isDiscount);
    }

    // Sorting
    const sortBy = dom.sortBySelect.value;
    if (sortBy === 'terlaris') { // 'terlaris' is still in Indonesian here, but the option text in HTML is 'Best Sellers'
        // Best sellers always at the top, then sort others by name for consistency
        filteredWatches.sort((a, b) => {
            if (a.isBestSeller && !b.isBestSeller) return -1;
            if (!a.isBestSeller && b.isBestSeller) return 1;
            return a.name.localeCompare(b.name); // Secondary sort for non-bestsellers
        });
    } else if (sortBy === 'price-asc') {
        filteredWatches.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredWatches.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
        filteredWatches.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
        filteredWatches.sort((a, b) => b.name.localeCompare(a.name));
    }

    renderProducts(filteredWatches);
}

// Event Listeners for Filters and Sort
export function setupFilterSortListeners() {
    dom.searchInput.addEventListener('input', applyFiltersAndSort); // Live search
    dom.searchButton.addEventListener('click', applyFiltersAndSort);
    dom.sortBySelect.addEventListener('change', applyFiltersAndSort);
    dom.filterBrandSelect.addEventListener('change', applyFiltersAndSort);
    dom.filterPriceSelect.addEventListener('change', applyFiltersAndSort);
    dom.filterTypeSelect.addEventListener('change', applyFiltersAndSort);
    dom.filterColorSelect.addEventListener('change', applyFiltersAndSort);
    dom.filterCaseMaterialSelect.addEventListener('change', applyFiltersAndSort);
    dom.filterStrapTypeSelect.addEventListener('change', applyFiltersAndSort);
    dom.filterNewCheckbox.addEventListener('change', applyFiltersAndSort);
    dom.filterUsedCheckbox.addEventListener('change', applyFiltersAndSort);
    dom.filterDiscountCheckbox.addEventListener('change', applyFiltersAndSort);
}
