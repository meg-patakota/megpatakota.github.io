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

// Animated Background
function createAnimatedBackground() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length < 100) {
            particles.push(new Particle());
        }
        handleParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

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
            .attr('fill', () => d3.interpolateRainbow(Math.random()));
    }
}

// Skills Chart
function createSkillsChart() {
    const margin = {top: 20, right: 30, bottom: 40, left: 90};
    const width = document.getElementById('skills-chart').clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#skills-chart')
        .append('
