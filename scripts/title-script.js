// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const previewContent = document.getElementById('preview-content');
const previewImage = document.getElementById('preview-image');
const previewTitle = document.getElementById('preview-title');
const previewDescription = document.getElementById('preview-description');
const selectionIndicator = document.getElementById('selection-indicator'); // Can be null if commented out
const prevArrow = document.getElementById('prev-arrow');
const nextArrow = document.getElementById('next-arrow');
const menuIcons = document.getElementById('menu-icons');

// State variables
let currentSelection = null;
let currentIndex = 0;

/**
 * Initialize the first item as selected
 */
function initializeFirstItem() {
    if (menuItems.length > 0) {
        currentSelection = menuItems[0];
        currentIndex = 0;
        updatePreview(currentSelection);
        currentSelection.classList.add('selected');
        previewContent.classList.add('show');
    }
}

/**
 * Update the preview area with the selected item's information
 * @param {HTMLElement} item - The selected menu item
 */
function updatePreview(item) {
    const title = item.getAttribute('data-title');
    const description = item.getAttribute('data-description');
    const image = item.getAttribute('data-image');
    
    previewTitle.textContent = title;
    previewDescription.textContent = description;
    
    if (image && image !== 'null') {
        previewImage.src = image;
        previewImage.alt = title;
        previewImage.style.display = 'block';
    } else {
        previewImage.style.display = 'none';
    }
    
    // Update selection indicator only if it exists
    if (selectionIndicator) {
        selectionIndicator.textContent = `${currentIndex + 1}/${menuItems.length} is selected now`;
    }
}

/**
 * Select a menu item by index
 * @param {number} index - The index of the item to select
 */
function selectItem(index) {
    // Remove previous selection
    if (currentSelection) {
        currentSelection.classList.remove('selected');
    }
    
    // Add selection to new item
    currentIndex = index;
    currentSelection = menuItems[currentIndex];
    currentSelection.classList.add('selected');
    
    // Update preview
    updatePreview(currentSelection);
    
    // Show preview if hidden
    if (!previewContent.classList.contains('show')) {
        previewContent.classList.add('show');
    }
}

/**
 * Navigate to the next item
 */
function navigateNext() {
    currentIndex = (currentIndex + 1) % menuItems.length;
    selectItem(currentIndex);
}

/**
 * Navigate to the previous item
 */
function navigatePrevious() {
    currentIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
    selectItem(currentIndex);
}

/**
 * Handle menu item click
 * @param {Event} e - The click event
 * @param {HTMLElement} item - The clicked menu item
 */
function handleItemClick(e, item) {
    if (item.tagName === 'DIV') {
        // For info-only items, prevent default navigation
        e.preventDefault();
        console.log('Info item clicked:', item.getAttribute('data-title'));
    }
}

/**
 * Update slider arrow visibility based on number of items
 */
function updateSliderVisibility() {
    if (menuItems.length > 5) { // Show arrows if more than 5 icons
        if (prevArrow) prevArrow.classList.add('visible');
        if (nextArrow) nextArrow.classList.add('visible');
    }
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Mouse interactions for menu items
    menuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            selectItem(index);
        });

        item.addEventListener('click', (e) => {
            handleItemClick(e, item);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                navigateNext();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigatePrevious();
                break;
            case 'Enter':
                e.preventDefault();
                if (currentSelection && currentSelection.tagName === 'A') {
                    currentSelection.click();
                }
                break;
        }
    });

    // Slider arrows (only if they exist)
    if (prevArrow) prevArrow.addEventListener('click', navigatePrevious);
    if (nextArrow) nextArrow.addEventListener('click', navigateNext);
}

/**
 * Initialize the application
 */
function init() {
    console.log('Initializing menu system...');
    console.log('Found', menuItems.length, 'menu items');
    
    setupEventListeners();
    initializeFirstItem();
    updateSliderVisibility();
    
    console.log('Menu system initialized successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);