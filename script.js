// Sample data (replace with your own)
const skills = [
    {name: 'Python', level: 90},
    {name: 'Machine Learning', level: 85},
    {name: 'Data Visualization', level: 80},
    {name: 'SQL', level: 75},
    {name: 'Big Data', level: 70},
    {name: 'Deep Learning', level: 65}
];

const projects = [
    {
        name: 'Predictive Analytics Dashboard',
        description: 'Developed a real-time dashboard for predicting customer churn using machine learning algorithms.',
        techStack: ['Python', 'Scikit-learn', 'Flask', 'D3.js']
    },
    {
        name: 'Natural Language Processing Tool',
        description: 'Created a tool for sentiment analysis and topic modeling of social media data.',
        techStack: ['Python', 'NLTK', 'Gensim', 'Plotly']
    },
    {
        name: 'Time Series Forecasting Model',
        description: 'Built a model to forecast energy consumption patterns for a smart city project.',
        techStack: ['Python', 'Pandas', 'Statsmodels', 'Prophet']
    }
];

// Hero Visualization
function createHeroVisualization() {
    const width = document.getElementById('hero-visualization').clientWidth;
    const height = 400;

    const svg = d3.select('#hero-visualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const simulation = d3.forceSimulation()
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('charge', d3.forceManyBody().strength(50))
        .force('collide', d3.forceCollide(30));

    const nodes = d3.range(50).map(() => ({radius: Math.random() * 20 + 5}));

    simulation.nodes(nodes).on('tick', ticked);

    function ticked() {
        const u = svg.selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', d => d.radius)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)]);
    }
}

// Skills Chart
function createSkillsChart() {
    const margin = {top: 20, right: 30, bottom: 40, left: 90};
    const width = document.getElementById('skills-chart').clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#skills-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const y = d3.scaleBand()
        .range([0, height])
        .domain(skills.map(d => d.name))
        .padding(.1);

    svg.selectAll('myRect')
        .data(skills)
        .join('rect')
        .attr('x', x(0))
        .attr('y', d => y(d.name))
        .attr('width', d => x(d.level))
        .attr('height', y.bandwidth())
        .attr('fill', '#8C1C13');

    svg.append('g')
        .call(d3.axisLeft(y));

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));
}

// Populate projects
function populateProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projects.forEach(project => {
        const div = document.createElement('div');
        div.classList.add('project-item');
        div.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Tech Stack:</strong> ${project.techStack.join(', ')}</p>
        `;
        projectsGrid.appendChild(div);
    });
}

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

// Initialize visualizations and populate content
document.addEventListener('DOMContentLoaded', () => {
    createHeroVisualization();
    createSkillsChart();
    populateProjects();
});
