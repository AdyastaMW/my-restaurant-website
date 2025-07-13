// domElements.js

export const dom = {
    // Main elements
    productList: document.getElementById('product-list'),
    searchInput: document.getElementById('search-input'),
    searchButton: document.getElementById('search-button'),
    sortBySelect: document.getElementById('sort-by'),

    // Filter elements
    filterBrandSelect: document.getElementById('filter-brand'),
    filterPriceSelect: document.getElementById('filter-price'),
    filterTypeSelect: document.getElementById('filter-type'),
    filterColorSelect: document.getElementById('filter-color'),
    filterCaseMaterialSelect: document.getElementById('filter-case-material'),
    filterStrapTypeSelect: document.getElementById('filter-strap-type'),
    filterNewCheckbox: document.getElementById('filter-new'),
    filterUsedCheckbox: document.getElementById('filter-used'),
    filterDiscountCheckbox: document.getElementById('filter-discount'),

    // Product Detail Modal elements
    productDetailModal: document.getElementById('product-detail-modal'),
    detailProductName: document.getElementById('detail-product-name'),
    detailProductImage: document.getElementById('detail-product-image'),
    detailProductBrand: document.getElementById('detail-product-brand'),
    detailProductPrice: document.getElementById('detail-product-price'),
    toggleDescriptionBtn: document.getElementById('toggle-description-btn'),
    detailDescriptionContent: document.getElementById('detail-description-content'),
    descModel: document.getElementById('desc-model'),
    descSku: document.getElementById('desc-sku'),
    descGender: document.getElementById('desc-gender'),
    descStyle: document.getElementById('desc-style'),
    descMovement: document.getElementById('desc-movement'),
    descCaliber: document.getElementById('desc-caliber'),
    descPowerReserve: document.getElementById('desc-power-reserve'),
    descFrequency: document.getElementById('desc-frequency'),
    descCaseMaterial: document.getElementById('desc-case-material'),
    descCaseDiameter: document.getElementById('desc-case-diameter'),
    descCaseThickness: document.getElementById('desc-case-thickness'),
    descCaseShape: document.getElementById('desc-case-shape'),
    descCaseCoating: document.getElementById('desc-case-coating'),
    descCrystal: document.getElementById('desc-crystal'),
    descDialColor: document.getElementById('desc-dial-color'),
    descMarkers: document.getElementById('desc-markers'),
    descLume: document.getElementById('desc-lume'),
    descWaterResistance: document.getElementById('desc-water-resistance'),
    descFunctions: document.getElementById('desc-functions'),
    descWarranty: document.getElementById('desc-warranty'),
    descCompleteness: document.getElementById('desc-completeness'),

    // Order Form Modal elements
    orderFormModal: document.getElementById('order-form-modal'),
    orderProductName: document.getElementById('order-product-name'),
    orderProductPrice: document.getElementById('order-product-price'),
    orderProductImage: document.getElementById('order-product-image'),
    orderForm: document.getElementById('order-form'),
    orderMessage: document.getElementById('order-message'),
    customerName: document.getElementById('customer-name'),
    customerAddress: document.getElementById('customer-address'),
    customerPhone: document.getElementById('customer-phone'),
    customerEmail: document.getElementById('customer-email'),
    paymentMethodRadios: document.querySelectorAll('input[name="payment-method"]'),
    orderNotes: document.getElementById('order-notes'),

    // Comments Section elements
    commentsList: document.getElementById('comments-list'),
    noCommentsMessage: document.getElementById('no-comments-message'),
    submitCommentBtn: document.getElementById('submit-comment-btn'),
    commenterNameInput: document.getElementById('commenter-name'),
    commentTextInput: document.getElementById('comment-text'),
    commentMessage: document.getElementById('comment-message'),
    starRatingRadios: document.querySelectorAll('.star-rating input[type="radio"]'),
    starRatingLabels: document.querySelectorAll('.star-rating label')
};
