// content-loader.js

document.addEventListener('DOMContentLoaded', function () {
    loadContent('technical-skills.html', 'technical-skills-container');
    loadContent('projects.html', 'projects-container');
});

function loadContent(file, containerId) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => {
            console.error(`Error loading ${file}:`, error);
            document.getElementById(containerId).innerHTML =
                `<p style="color:red;">Failed to load ${file} section.</p>`;
        });
}
