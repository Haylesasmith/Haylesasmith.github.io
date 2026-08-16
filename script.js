// ARTWORK DATA ARRAY
// To add a new artwork, add an object to this array with the following properties:
// - image: filename in /images folder
// - title: artwork title
// - year: year created
// - medium: materials used
// - dimensions: size of artwork
// - description: short description
// - status: "Available" or "Sold"

const artworks = [
    {
        image: 'painting1.jpg',
        title: 'Dallas Road',
        year: 2025,
        medium: 'Oil on board',
        dimensions: '9 × 11 inch',
        // description: 'A meditation on colour and form exploring the relationship between positive and negative space.',
        // status: 'Available'
    },
    {
        image: 'painting2.jpg',
        title: 'View from the Ferry',
        year: 2025,
        medium: 'Oil on panel',
        dimensions: '6 × 8 inch',
        // description: 'Part of an ongoing series investigating texture and layering.',
        // status: 'Sold'
    },

    {
        image: 'painting3.jpg',
        title: 'Still Life 1',
        year: 2024,
        medium: 'Oil on canvas',
        dimensions: '9 × 12 inch',
        // description: 'Part of an ongoing series investigating texture and layering.',
        // status: 'Sold'
    },

    {
        image: 'painting4.jpg',
        title: 'Port Angeles',
        year: 2025,
        medium: 'Oil on board',
        dimensions: '9 × 12 inch',
        // description: 'Part of an ongoing series investigating texture and layering.',
        // status: 'Sold'
    },
    {
        image: 'painting5.jpg',
        title: 'Thetis',
        year: 2024,
        medium: 'Acrylic on canvas',
        dimensions: '12 × 12 inch',
        // description: 'Part of an ongoing series investigating texture and layering.',
        // status: 'Sold'
    },
    
    {
        image: 'study1.jpg',
        title: 'Study for Landslide Lake',
        year: 2026,
        medium: 'Oil on paper',
        dimensions: '6 × 8 inch',
        // description: 'Part of an ongoing series investigating texture and layering.',
        // status: 'Sold'
    }
    // ,{
    //     image: 'painting1.jpg',
    //     title: 'Composition in Grey',
    //     year: 2023,
    //     medium: 'Mixed media',
    //     dimensions: '100 × 100 cm',
    //     description: 'An exploration of monochromatic palettes and geometric abstraction.',
    //     status: 'Available'
    // },
    // {
    //     image: 'painting1.jpg',
    //     title: 'Untitled #4',
    //     year: 2023,
    //     medium: 'Oil on linen',
    //     dimensions: '150 × 120 cm',
    //     description: 'Working with translucency and light within a constrained colour palette.',
    //     status: 'Available'
    // }
];

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderGallery();
    setupLightbox();
});

// RENDER GALLERY FROM ARTWORK DATA
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = ''; // Clear existing content

    artworks.forEach((artwork, index) => {
        // Create gallery item
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);

        // Image
        const img = document.createElement('img');
        img.src = `images/${artwork.image}`;
        img.alt = artwork.title;
        img.className = 'gallery-item-image';

        // Info section
        const info = document.createElement('div');
        info.className = 'gallery-item-info';

        // Title
        const title = document.createElement('h3');
        title.className = 'gallery-item-title';
        title.textContent = artwork.title;

        // Metadata
        const meta = document.createElement('div');
        meta.className = 'gallery-item-meta';
        meta.innerHTML = `
            <div>${artwork.year}</div>
            <div>${artwork.medium}</div>
            <div>${artwork.dimensions}</div>
        `;

        // Status
        const status = document.createElement('div');
        status.className = `gallery-item-status ${artwork.status === 'Sold' ? 'status-sold' : 'status-available'}`;
        status.textContent = artwork.status;

        // Append elements
        info.appendChild(title);
        info.appendChild(meta);
        info.appendChild(status);
        galleryItem.appendChild(img);
        galleryItem.appendChild(info);
        galleryGrid.appendChild(galleryItem);

        // Add click event to open lightbox
        galleryItem.addEventListener('click', function() {
            openLightbox(index);
        });
    });
}

// LIGHTBOX FUNCTIONALITY
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close');

    // Close lightbox when clicking X
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox(index) {
    const artwork = artworks[index];
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxInfo = document.getElementById('lightboxInfo');

    lightboxImage.src = `images/${artwork.image}`;
    lightboxImage.alt = artwork.title;

    lightboxInfo.innerHTML = `
        <h3 style="color: white; margin-bottom: 1rem;">${artwork.title}</h3>
        <p><strong>Year:</strong> ${artwork.year}</p>
        <p><strong>Medium:</strong> ${artwork.medium}</p>
        <p><strong>Dimensions:</strong> ${artwork.dimensions}</p>
    `;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}