// Animated Background with Data Elements
function createAnimatedBackground() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('hero');
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const dataElements = [];
    const numberOfElements = 75;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2;
    const minRadius = maxRadius / 3;

    let mouseX = 1000;
    let mouseY = 1000;

    class DataElement {
        constructor() {
            this.angle = Math.random() * Math.PI * 2;
            this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
            this.size = Math.random() * 20 + 10;
            this.speed = 0.0005 + Math.random() * 0.0005;
            this.type = Math.floor(Math.random() * 3);
            this.color = `rgba(46, 17, 20, ${Math.random() * 0.3 + 0.1})`;
            this.value = Math.floor(Math.random() * 100);
            this.direction = Math.random() < 0.5 ? 1 : -1;
        }

        update() {
            this.angle += this.speed * this.direction;
            
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.min(canvas.width, canvas.height) / 2;
            const influenceFactor = Math.min(1, distanceFromCenter / maxDistance) * 0.1;
            
            this.x = centerX + Math.cos(this.angle) * this.radius + dx * influenceFactor * 0.1;
            this.y = centerY + Math.sin(this.angle) * this.radius + dy * influenceFactor * 0.1;
            
            this.radius -= 0.05;
            if (this.radius < minRadius) {
                this.radius = maxRadius;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px Arial`;
            
            if (this.type === 0) {
                ctx.fillText(this.value, this.x, this.y);
            } else if (this.type === 1) {
                this.drawGraph();
            } else {
                this.drawSymbol();
            }
        }

        drawGraph() {
            const points = [];
            for (let i = 0; i < 5; i++) {
                points.push({
                    x: this.x + i * 10,
                    y: this.y + Math.random() * 20 - 10
                });
            }

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }

        drawSymbol() {
            const symbols = ['Σ', 'μ', 'σ', 'Δ', '∫', '∞', 'θ', 'λ', '√', 'π'];
            ctx.fillText(symbols[Math.floor(Math.random() * symbols.length)], this.x, this.y);
        }
    }

    function init() {
        dataElements.length = 0;
        for (let i = 0; i < numberOfElements; i++) {
            dataElements.push(new DataElement());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < dataElements.length; i++) {
            dataElements[i].update();
            dataElements[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    heroSection.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });
}

// Interactive skills and projects
function createInteractiveElements() {
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');

    function addInteractivity(cards) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05) translateY(-10px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('click', () => {
                card.classList.add('clicked');
                setTimeout(() => {
                    card.classList.remove('clicked');
                }, 300);
            });
        });
    }

    addInteractivity(skillCards);
    addInteractivity(projectCards);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createAnimatedBackground();
    createInteractiveElements();
});