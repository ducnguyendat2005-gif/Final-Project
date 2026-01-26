const coursesData = [
    { id: 1, title: "Beginner's Guide to Design", author: "Ronald Richards", rating: 4.8, reviews: 1200, hours: 22, lectures: 155, level: "Beginner", price: 149.9, chapters: 18, category: "design" },
    { id: 2, title: "Advanced Web Design Techniques", author: "Ronald Richards", rating: 4.7, reviews: 980, hours: 30, lectures: 200, level: "Advanced", price: 199.9, chapters: 25, category: "design" },
    { id: 3, title: "UI/UX Design Masterclass", author: "Ronald Richards", rating: 4.9, reviews: 1500, hours: 28, lectures: 180, level: "Intermediate", price: 179.9, chapters: 22, category: "design" },
    { id: 4, title: "Graphic Design Fundamentals", author: "Ronald Richards", rating: 4.6, reviews: 850, hours: 20, lectures: 140, level: "Beginner", price: 129.9, chapters: 15, category: "design" },
    { id: 5, title: "Mobile App Design", author: "Ronald Richards", rating: 4.8, reviews: 1100, hours: 25, lectures: 165, level: "Intermediate", price: 159.9, chapters: 20, category: "design" },
    { id: 6, title: "Brand Identity Design", author: "Ronald Richards", rating: 4.7, reviews: 920, hours: 24, lectures: 150, level: "Beginner", price: 139.9, chapters: 17, category: "design" },
    { id: 7, title: "Web Development Bootcamp", author: "Ronald Richards", rating: 4.9, reviews: 2000, hours: 45, lectures: 300, level: "Beginner", price: 249.9, chapters: 30, category: "development" },
    { id: 8, title: "Digital Marketing Strategy", author: "Ronald Richards", rating: 4.5, reviews: 750, hours: 18, lectures: 120, level: "Beginner", price: 119.9, chapters: 12, category: "marketing" },
    { id: 9, title: "3D Design and Animation", author: "Ronald Richards", rating: 4.8, reviews: 1300, hours: 35, lectures: 220, level: "Advanced", price: 219.9, chapters: 28, category: "design" },
    { id: 10, title: "Typography Essentials", author: "Ronald Richards", rating: 4.6, reviews: 680, hours: 15, lectures: 100, level: "Beginner", price: 99.9, chapters: 10, category: "design" },
    { id: 11, title: "Color Theory for Designers", author: "Ronald Richards", rating: 4.7, reviews: 890, hours: 16, lectures: 110, level: "Beginner", price: 109.9, chapters: 12, category: "design" },
    { id: 12, title: "Responsive Web Design", author: "Ronald Richards", rating: 4.8, reviews: 1400, hours: 26, lectures: 175, level: "Intermediate", price: 169.9, chapters: 21, category: "design" }
];

let filteredCourses = [...coursesData];
let currentPage = 1;
const coursesPerPage = 9;

function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const coursesToShow = filteredCourses.slice(startIndex, endIndex);

    grid.innerHTML = coursesToShow.map(course => `
        <div class="course-card">
            <div class="course-image">
                <img src="./Rectangle 1080.png">
            </div>
            <div class="course-info">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-author">By ${course.author}</p>
                <div class="course-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5-Math.floor(course.rating))}</span>
                    <span class="rating-count">(${course.reviews} Ratings)</span>
                </div>
                <p class="course-details">${course.hours} Total Hours. ${course.lectures} Lectures. ${course.level}</p>
                <p class="course-price">$${course.price}</p>
            </div>
        </div>
    `).join('');

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    let paginationHTML = `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>
        `;
    }

    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>›</button>
    `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderCourses();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function applyFilters() {
    filteredCourses = coursesData.filter(course => {
        const ratingFilters = Array.from(document.querySelectorAll('input[id^="rating"]:checked')).map(cb => parseInt(cb.value));
        const chapterFilters = Array.from(document.querySelectorAll('input[id^="chapters"]:checked')).map(cb => cb.value);
        const priceFilters = Array.from(document.querySelectorAll('input[id^="price"]:checked')).map(cb => cb.value);
        const categoryFilters = Array.from(document.querySelectorAll('input[id^="cat"]:checked')).map(cb => cb.value);

        let passRating = ratingFilters.length === 0 || ratingFilters.some(r => Math.floor(course.rating) >= r);
        
        let passChapter = chapterFilters.length === 0 || chapterFilters.some(range => {
            const [min, max] = range.split('-').map(Number);
            return course.chapters >= min && course.chapters <= max;
        });

        let passPrice = priceFilters.length === 0 || priceFilters.some(range => {
            const [min, max] = range.split('-').map(Number);
            return course.price >= min && course.price <= max;
        });

        let passCategory = categoryFilters.length === 0 || categoryFilters.includes(course.category);

        return passRating && passChapter && passPrice && passCategory;
    });

    currentPage = 1;
    renderCourses();
}

function sortCourses() {
    const sortValue = document.getElementById('sortSelect').value;

    switch(sortValue) {
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCourses.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredCourses.sort((a, b) => b.id - a.id);
            break;
        default:
            filteredCourses = [...coursesData];
    }

    currentPage = 1;
    renderCourses();
}

function toggleFilter(header) {
    header.classList.toggle('collapsed');
    const content = header.nextElementSibling;
    content.classList.toggle('hidden');
}

function toggleMobileFilters() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
}

renderCourses();