// orderForm.js

import { dom } from './domElements.js';
import { currentProduct } from './utils.js';
import { closeOrderFormModal, closeProductDetailModal } from './modals.js';

// !! PENTING: URL ini telah diperbarui dengan URL Web App Google Apps Script Anda !!
const GOOGLE_APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzMY8pPIBWzFwe7qH6ipsxEcws5zcsmj07qhuQ6q2cmg2FUEJrK8zeOX2nCpLHbahlBug/exec';

export function setupOrderFormListener() {
    dom.orderForm.addEventListener('submit', async (e) => { // Tambahkan 'async' di sini
        e.preventDefault();

        // Tampilkan pesan loading
        dom.orderMessage.textContent = 'Submitting your order... Please wait.';
        dom.orderMessage.className = 'text-sm mt-2 text-blue-600';

        const customerName = dom.customerName.value;
        const customerAddress = dom.customerAddress.value;
        const customerPhone = dom.customerPhone.value;
        const customerEmail = dom.customerEmail.value;
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value; // Gunakan optional chaining
        const orderNotes = dom.orderNotes.value;

        if (!paymentMethod) {
            dom.orderMessage.textContent = 'Please select a payment method.';
            dom.orderMessage.className = 'text-sm mt-2 text-red-600';
            return;
        }

        const orderDetails = {
            timestamp: new Date().toLocaleString('en-GB'), // Format tanggal/waktu yang konsisten
            productId: currentProduct ? currentProduct.id : 'N/A',
            productName: currentProduct ? currentProduct.name : 'N/A',
            productPrice: currentProduct ? currentProduct.price : 'N/A',
            customerName: customerName,
            customerAddress: customerAddress,
            customerPhone: customerPhone,
            customerEmail: customerEmail,
            paymentMethod: paymentMethod,
            orderNotes: orderNotes
        };

        try {
            // Kirim data ke Google Apps Script Web App
            const response = await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
                method: 'POST',
                mode: 'cors', // Penting untuk permintaan lintas asal
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(orderDetails).toString() // Kirim sebagai form-urlencoded
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status === 'SUCCESS') {
                    console.log("Order Details submitted:", orderDetails);
                    dom.orderMessage.textContent = 'Your order has been received! We will contact you shortly.';
                    dom.orderMessage.className = 'text-sm mt-2 text-green-600';
                    dom.orderForm.reset(); // Reset form fields
                    // Optional: Close modal after a short delay
                    setTimeout(() => {
                        closeOrderFormModal();
                        closeProductDetailModal();
                    }, 3000);
                } else {
                    throw new Error(result.message || 'Unknown error from server.');
                }
            } else {
                throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            dom.orderMessage.textContent = `Failed to submit order: ${error.message}. Please try again.`;
            dom.orderMessage.className = 'text-sm mt-2 text-red-600';
        }
    });
}
