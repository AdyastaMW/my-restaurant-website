// utils.js

// Format currency to IDR
export function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Global variable to store the currently viewed product
export let currentProduct = null;

// Function to set the current product
export function setCurrentProduct(product) {
    currentProduct = product;
}
