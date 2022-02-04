// import '../../node_modules/simplelightbox/src/simple-lightbox.scss';
// Add imports above this line

import { galleryItems } from './gallery-items.js';
// Change code below this line
const listRef = document.querySelector('.gallery');

function renderArrayElements(array) {
    return array.map(({ description, original, preview }) => {
        return  `<li><a class="gallery__item" href=${original}>
        <img class="gallery__image" src=${preview} alt="${description}" />
        </a></li>`;
    }).join('');
}

const markup = renderArrayElements(galleryItems);
listRef.insertAdjacentHTML('beforeend', markup);
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
listRef.addEventListener('click', handleImageClick);

function handleImageClick(event) {
    event.preventDefault();
}