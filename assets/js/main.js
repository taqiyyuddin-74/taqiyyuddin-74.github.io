document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Update year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Load data based on current page
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
        loadFeaturedProjects();
    } else if (path === 'about.html') {
        loadSkills();
    } else if (path === 'projects.html') {
        loadAllProjects();
        setupProjectFilters();
    } else if (path === 'experience.html') {
        loadExperience();
    } else if (path === 'certifications.html') {
        loadCertifications();
    }
});

// Sample data - replace with your actual data
const projectsData = [
    {
        id: 1,
        title: "E-commerce Website",
        description: "A fully responsive e-commerce platform with payment integration.",
        image: "assets/images/project1.png",
        tags: ["web", "design"],
        link: "#"
    }
];

const skillsData = ["HTML5", "CSS3", "JavaScript", "PHP", "React"];
const experienceData = [
    {
        position: "Frontend Developer",
        company: "Tech Solutions Inc.",
        period: "2020-Present",
        description: "Developed responsive web applications."
    }
];
const certificationsData = [
    {
        title: "Full Stack Certification",
        issuer: "Coursera",
        date: "June 2021",
        image: "assets/images/cert1.jpeg"
    }
];

// Load functions
function loadFeaturedProjects() {
    const container = document.getElementById('featuredProjects');
    if (container) {
        projectsData.slice(0, 3).forEach(project => {
            container.innerHTML += createProjectCard(project);
        });
    }
}

function loadAllProjects() {
    const container = document.getElementById('projectsContainer');
    if (container) {
        projectsData.forEach(project => {
            container.innerHTML += createProjectCard(project);
        });
    }
}

function createProjectCard(project) {
    return `
        <div class="project-card" data-tags="${project.tags.join(',')}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn">View Project</a>
            </div>
        </div>
    `;
}

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.tags.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

function loadSkills() {
    const container = document.getElementById('skillsList');
    if (container) {
        skillsData.forEach(skill => {
            container.innerHTML += `<span class="skill">${skill}</span>`;
        });
    }
}

function loadExperience() {
    const container = document.getElementById('experienceTimeline');
    if (container) {
        experienceData.forEach((exp, index) => {
            const positionClass = index % 2 === 0 ? 'left' : 'right';
            container.innerHTML += `
                <div class="timeline-item ${positionClass}">
                    <div class="timeline-content">
                        <h3>${exp.position}</h3>
                        <p class="timeline-company">${exp.company}</p>
                        <p class="timeline-date">${exp.period}</p>
                        <p>${exp.description}</p>
                    </div>
                </div>
            `;
        });
    }
}

function loadCertifications() {
    const container = document.getElementById('certificationsContainer');
    if (container) {
        certificationsData.forEach(cert => {
            container.innerHTML += `
                <div class="certification-card">
                    <div class="certification-image">
                        <img src="${cert.image}" alt="${cert.title}">
                    </div>
                    <div class="certification-info">
                        <h3>${cert.title}</h3>
                        <p class="issuer">${cert.issuer}</p>
                        <p class="date">Issued: ${cert.date}</p>
                        <a href="#" class="btn">View Certificate</a>
                    </div>
                </div>
            `;
        });
    }
}