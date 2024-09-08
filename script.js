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
    const numberOfElements = 30;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 1.5; // Increased divisor to reduce spread
    const minRadius = maxRadius / 4; // Adjusted to keep elements further from the center


    let mouseX = 1000;
    let mouseY = 1000;

    class DataElement {
        constructor() {
            this.angle = Math.random() * Math.PI * 2;
            this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
            this.size = Math.random() * 12 + 6;
            this.speed = 0.0000001 + Math.random() * 0.0000001; // Reduced from 0.0005 to slow down
            this.type = Math.floor(Math.random() * 3);
            this.color = `rgba(46, 17, 20, ${Math.random() * 0.3 + 0.1})`;
            this.value = Math.floor(Math.random() * 100);
            this.direction = Math.random() < 0.1? 1 : -1;
            this.symbol = this.getRandomSymbol(); // Assign a fixed symbol on creation
            
        }

        update() {
            this.angle += this.speed * this.direction;
            
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.min(canvas.width, canvas.height) / 2;
            const influenceFactor = Math.min(1, distanceFromCenter / maxDistance) * 0.05; // Reduced from 0.1
            
            // Circular motion
            this.x = centerX + Math.cos(this.angle) * this.radius;
            this.y = centerY + Math.sin(this.angle) * this.radius;
            
            // Slight radial oscillation
            this.radius += Math.sin(this.angle * 5) * 0.1;
            if (this.radius < minRadius) this.radius = minRadius;
            if (this.radius > maxRadius) this.radius = maxRadius;
        }
            
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.font = `${this.size}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
        
            if (this.type === 0) {
                ctx.fillText(this.value, this.x, this.y);
            } else {
                this.drawSymbol();
            }
        

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        drawSymbol() {
            ctx.fillText(this.symbol, this.x, this.y);
        }
    
        getRandomSymbol() {
            const symbols = ['Σ', 'μ', 'σ', 'Δ', '∫', '∞', 'θ', 'λ', '√', 'π'];
            return symbols[Math.floor(Math.random() * symbols.length)];
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

// Header scroll behavior with threshold
function createHeaderScrollBehavior() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Adjust this value to set when the header should disappear

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            // Past the threshold, hide the header
            header.classList.add('header-hidden');
        } else {
            // Above the threshold, show the header
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);
}

// ... (previous JavaScript code remains unchanged) ...

// Add interactivity to CTA buttons
function createCTAButtonInteractivity() {
    const exploreButton = document.getElementById('explore-button');
    const collaborateButton = document.getElementById('collaborate-button');

    function addButtonEffect(button) {
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 300);
        });
    }

    addButtonEffect(exploreButton);
    addButtonEffect(collaborateButton);
}
// New function for dropdown menu
function createDropdownMenu() {
    const dropBtn = document.getElementById('dropbtn');
    const dropdownContent = document.getElementById('myDropdown');

    // Toggle dropdown visibility on button click
    dropBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Stop the event from bubbling up
        dropdownContent.classList.toggle('show');
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!dropBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    
    document.getElementById("dropbtn").onclick = function () {
            document.getElementById("myDropdown").classList.toggle("show");
        };
        
    });
}
// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createAnimatedBackground();
    createInteractiveElements();
    createHeaderScrollBehavior();
    createCTAButtonInteractivity();
    createDropdownMenu(); 
});
