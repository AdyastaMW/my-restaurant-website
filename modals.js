// modals.js

import { dom } from './domElements.js';
import { watches } from './data.js';
import { formatCurrency, setCurrentProduct, currentProduct } from './utils.js';
import { renderComments } from './comments.js';

// Product Detail Modal Functions
export function openProductDetailModal(id) {
    const product = watches.find(watch => watch.id === id);
    if (product) {
        setCurrentProduct(product); // Set global currentProduct
        dom.detailProductName.textContent = product.name;
        dom.detailProductImage.src = product.image;
        dom.detailProductBrand.textContent = product.brand;
        dom.detailProductPrice.innerHTML = product.isDiscount ?
            `<span class="text-sm text-gray-500 line-through mr-2">${formatCurrency(product.originalPrice)}</span> ${formatCurrency(product.price)}` :
            formatCurrency(product.price);

        // Populate description details
        const desc = product.description;
        dom.descModel.textContent = desc.model;
        dom.descSku.textContent = desc.sku;
        dom.descGender.textContent = desc.gender;
        dom.descStyle.textContent = desc.style;
        dom.descMovement.textContent = desc.movement;
        dom.descCaliber.textContent = desc.caliber;
        dom.descPowerReserve.textContent = desc.powerReserve;
        dom.descFrequency.textContent = desc.frequency;
        dom.descCaseMaterial.textContent = desc.caseMaterial;
        dom.descCaseDiameter.textContent = desc.caseDiameter;
        dom.descCaseThickness.textContent = desc.caseThickness;
        dom.descCaseShape.textContent = desc.caseShape;
        dom.descCaseCoating.textContent = desc.caseCoating;
        dom.descCrystal.textContent = desc.crystal;
        dom.descDialColor.textContent = desc.dialColor;
        dom.descMarkers.textContent = desc.markers;
        dom.descLume.textContent = desc.lume;
        dom.descWaterResistance.textContent = desc.waterResistance;
        dom.descFunctions.textContent = desc.functions;
        dom.descWarranty.textContent = desc.warranty;
        dom.descCompleteness.textContent = desc.completeness;

        // Reset description visibility
        dom.detailDescriptionContent.classList.add('hidden');
        dom.toggleDescriptionBtn.textContent = 'Description';

        renderComments(product.comments);
        dom.productDetailModal.classList.add('active');
    }
}

export function closeProductDetailModal() {
    dom.productDetailModal.classList.remove('active');
    setCurrentProduct(null); // Clear currentProduct
    // Clear comment form
    dom.commenterNameInput.value = '';
    dom.commentTextInput.value = '';
    dom.starRatingRadios.forEach(radio => radio.checked = false);
    dom.starRatingLabels.forEach(label => label.classList.remove('active'));
    dom.commentMessage.textContent = '';
    dom.commentMessage.className = 'text-sm mt-2';
}

export function setupModalListeners() {
    dom.toggleDescriptionBtn.addEventListener('click', () => {
        dom.detailDescriptionContent.classList.toggle('hidden');
        if (dom.detailDescriptionContent.classList.contains('hidden')) {
            dom.toggleDescriptionBtn.textContent = 'Description';
        } else {
            dom.toggleDescriptionBtn.textContent = 'Hide Description';
        }
    });
}

// Order Form Modal Functions
export function openOrderFormForProduct(productId) {
    const product = watches.find(watch => watch.id === productId);
    if (product) {
        setCurrentProduct(product); // Set global currentProduct
        dom.orderProductName.textContent = product.name;
        dom.orderProductPrice.textContent = formatCurrency(product.price);
        dom.orderProductImage.src = product.image;
        dom.orderFormModal.classList.add('active');
        dom.orderMessage.textContent = ''; // Clear previous messages
        dom.orderForm.reset(); // Reset form fields
    }
}

export function closeOrderFormModal() {
    dom.orderFormModal.classList.remove('active');
}

// Expose these functions globally so they can be called from inline HTML onclick attributes
window.openProductDetailModal = openProductDetailModal;
window.closeProductDetailModal = closeProductDetailModal;
window.openOrderFormForProduct = openOrderFormForProduct;
window.closeOrderFormModal = closeOrderFormModal;
