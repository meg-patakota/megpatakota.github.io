// Sample data (replace with your own)
const skills = ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Python'];
const projects = [
    { name: 'Project 1', description: 'A brief description of Project 1' },
    { name: 'Project 2', description: 'A brief description of Project 2' },
    { name: 'Project 3', description: 'A brief description of Project 3' }
];

// Populate skills
const skillsList = document.getElementById('skills-list');
skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    li.classList.add('skill-item');
    skillsList.appendChild(li);
});

// Populate projects
const projectsGrid = document.getElementById('projects-grid');
projects.forEach(project => {
    const div = document.createElement('div');
    div.classList.add('project-item');
    div.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
    `;
    projectsGrid.appendChild(div);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive header
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Form submission (replace with your own logic)
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
});

// CTA button animation
const ctaButton = document.getElementById('cta-button');
ctaButton.addEventListener('mouseover', () => {
    ctaButton.style.transform = 'scale(1.1)';
});
ctaButton.addEventListener('mouseout', () => {
    ctaButton.style.transform = 'scale(1)';
});
