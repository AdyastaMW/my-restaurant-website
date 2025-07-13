// productRender.js

import { dom } from './domElements.js';
import { formatCurrency } from './utils.js';
import { openProductDetailModal, openOrderFormForProduct } from './modals.js';

// Expose modal functions globally for onclick attributes in HTML
window.openProductDetailModal = openProductDetailModal;
window.openOrderFormForProduct = openOrderFormForProduct;

// Render product cards
export function renderProducts(productsToRender) {
    dom.productList.innerHTML = ''; // Clear existing products
    if (productsToRender.length === 0) {
        dom.productList.innerHTML = '<p class="text-center text-gray-500 col-span-full">No watches found.</p>';
        return;
    }

    productsToRender.forEach(watch => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col';
        productCard.innerHTML = `
            <img src="${watch.image}" alt="${watch.name}" class="w-full h-48 object-cover">
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${watch.name}</h3>
                <p class="text-gray-600 mb-2">${watch.brand}</p>
                ${watch.isDiscount ? `<p class="text-sm text-gray-500 line-through">${formatCurrency(watch.originalPrice)}</p>` : ''}
                <p class="text-2xl font-bold text-red-600 mb-4">${formatCurrency(watch.price)}</p>
                <div class="flex items-center text-sm mb-4">
                    <span class="px-3 py-1 rounded-full text-white ${watch.status === 'New' ? 'bg-blue-500' : 'bg-yellow-500'} mr-2">${watch.status}</span>
                    ${watch.isDiscount ? '<span class="px-3 py-1 rounded-full bg-green-500 text-white mr-2">Discount</span>' : ''}
                    ${watch.isBestSeller ? '<span class="px-3 py-1 rounded-full bg-purple-600 text-white">Best Seller</span>' : ''}
                </div>
                <button class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300 w-full mb-2 mt-auto" data-id="${watch.id}" onclick="openProductDetailModal('${watch.id}')">
                    Description
                </button>
                <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 w-full" data-id="${watch.id}" onclick="openOrderFormForProduct('${watch.id}')">
                    Order Now
                </button>
            </div>
        `;
        dom.productList.appendChild(productCard);
    });
}
