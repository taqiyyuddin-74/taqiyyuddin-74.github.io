document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Load data based on current page
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    
    switch(currentPage) {
        case 'index':
            loadFeaturedProjects();
            break;
        case 'about':
            loadSkills();
            break;
        case 'projects':
            loadAllProjects();
            setupProjectFilters();
            break;
        case 'experience':
            loadExperience();
            break;
        case 'certifications':
            loadCertifications();
            break;
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
    },
    {
        id: 2,
        title: "Mobile Task Manager",
        description: "A cross-platform mobile app for task management with cloud sync.",
        image: "assets/images/project2.png",
        tags: ["app"],
        link: "#"
    },
    {
        id: 3,
        title: "Portfolio Template",
        description: "A customizable portfolio template for creatives.",
        image: "assets/images/project1.png",
        tags: ["web", "design"],
        link: "#"
    },
    {
        id: 4,
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive maps.",
        image: "assets/images/project2.png",
        tags: ["web"],
        link: "#"
    }
];

const skillsData = [
    "HTML5", "CSS3", "JavaScript", "PHP", "React", "Node.js", 
    "MySQL", "Git", "Responsive Design", "UI/UX", "Python", "Java"
];

const experienceData = [
    {
        id: 1,
        position: "Frontend Developer",
        company: "Tech Solutions Inc.",
        period: "Jan 2020 - Present",
        description: "Developed and maintained responsive web applications using modern JavaScript frameworks."
    },
    {
        id: 2,
        position: "Web Designer",
        company: "Creative Agency",
        period: "Jun 2018 - Dec 2019",
        description: "Designed user interfaces for various clients across different industries."
    },
    {
        id: 3,
        position: "Intern",
        company: "Startup Company",
        period: "Jan 2018 - May 2018",
        description: "Assisted in development tasks and learned industry best practices."
    }
];

const certificationsData = [
    {
        id: 1,
        title: "Full Stack Web Development",
        issuer: "Coursera",
        date: "June 2021",
        image: "assets/images/cert1.jpeg",
        link: "#"
    },
    {
        id: 2,
        title: "JavaScript Advanced Concepts",
        issuer: "Udemy",
        date: "March 2021",
        image: "assets/images/cert1.jpeg",
        link: "#"
    },
    {
        id: 3,
        title: "UI/UX Design Specialization",
        issuer: "Google",
        date: "December 2020",
        image: "assets/images/cert1.jpeg",
        link: "#"
    }
];

// Functions to load data
function loadFeaturedProjects() {
    const featuredContainer = document.getElementById('featuredProjects');
    
    if (featuredContainer) {
        // Display first 3 projects as featured
        const featuredProjects = projectsData.slice(0, 3);
        
        featuredProjects.forEach(project => {
            const projectHTML = `
                <div class="project-card">
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
            featuredContainer.innerHTML += projectHTML;
        });
    }
}

function loadAllProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    if (projectsContainer) {
        projectsData.forEach(project => {
            const projectHTML = `
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
            projectsContainer.innerHTML += projectHTML;
        });
    }
}

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-tags').includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function loadSkills() {
    const skillsContainer = document.getElementById('skillsList');
    
    if (skillsContainer) {
        skillsData.forEach(skill => {
            const skillHTML = `<span class="skill">${skill}</span>`;
            skillsContainer.innerHTML += skillHTML;
        });
    }
}

function loadExperience() {
    const timelineContainer = document.getElementById('experienceTimeline');
    
    if (timelineContainer) {
        experienceData.forEach((exp, index) => {
            const positionClass = index % 2 === 0 ? 'left' : 'right';
            
            const expHTML = `
                <div class="timeline-item ${positionClass}">
                    <div class="timeline-content">
                        <h3>${exp.position}</h3>
                        <p class="timeline-company">${exp.company}</p>
                        <p class="timeline-date">${exp.period}</p>
                        <p>${exp.description}</p>
                    </div>
                </div>
            `;
            timelineContainer.innerHTML += expHTML;
        });
    }
}

function loadCertifications() {
    const certsContainer = document.getElementById('certificationsContainer');
    
    if (certsContainer) {
        certificationsData.forEach(cert => {
            const certHTML = `
                <div class="certification-card">
                    <div class="certification-image">
                        <img src="${cert.image}" alt="${cert.title}">
                    </div>
                    <div class="certification-info">
                        <h3>${cert.title}</h3>
                        <p class="issuer">${cert.issuer}</p>
                        <p class="date">Issued: ${cert.date}</p>
                        <a href="${cert.link}" class="btn">View Certificate</a>
                    </div>
                </div>
            `;
            certsContainer.innerHTML += certHTML;
        });
    }
}