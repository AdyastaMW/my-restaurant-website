// comments.js

import { dom } from './domElements.js';
import { currentProduct } from './utils.js';

export function renderComments(comments) {
    dom.commentsList.innerHTML = '';
    if (comments.length === 0) {
        dom.noCommentsMessage.style.display = 'block';
    } else {
        dom.noCommentsMessage.style.display = 'none';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-100';
            commentDiv.innerHTML = `
                <div class="flex items-center mb-2">
                    <span class="font-semibold text-gray-800 mr-2">${comment.name}</span>
                    <div class="flex">
                        ${'<span class="text-yellow-400">&#9733;</span>'.repeat(comment.rating)}
                        ${'<span class="text-gray-300">&#9733;</span>'.repeat(5 - comment.rating)}
                    </div>
                </div>
                <p class="text-gray-700">${comment.text}</p>
                <p class="text-xs text-gray-500 mt-2">${comment.timestamp}</p>
            `;
            dom.commentsList.appendChild(commentDiv);
        });
    }
}

export function setupCommentsListeners() {
    dom.submitCommentBtn.addEventListener('click', () => {
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const name = dom.commenterNameInput.value.trim();
        const text = dom.commentTextInput.value.trim();

        if (!rating || !name || !text) {
            dom.commentMessage.textContent = 'Please fill in all fields and provide a star rating.';
            dom.commentMessage.className = 'text-sm mt-2 text-red-600';
            return;
        }

        const newComment = {
            name: name,
            rating: parseInt(rating),
            text: text,
            timestamp: new Date().toLocaleString()
        };

        // Add comment to the current product's comments array
        if (currentProduct) {
            currentProduct.comments.unshift(newComment); // Add to the beginning
            renderComments(currentProduct.comments);
            dom.commentMessage.textContent = 'Your review has been successfully added!';
            dom.commentMessage.className = 'text-sm mt-2 text-green-600';
            // Clear form
            dom.commenterNameInput.value = '';
            dom.commentTextInput.value = '';
            dom.starRatingRadios.forEach(radio => radio.checked = false);
            dom.starRatingLabels.forEach(label => label.classList.remove('active'));
        } else {
            dom.commentMessage.textContent = 'An error occurred. Product not found.';
            dom.commentMessage.className = 'text-sm mt-2 text-red-600';
        }

        // In a real app, you would send this comment to your backend to save it permanently.
    });

    // Star rating interactivity
    dom.starRatingRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            dom.starRatingLabels.forEach((label, index) => {
                if (5 - index <= value) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
        });
    });
}
