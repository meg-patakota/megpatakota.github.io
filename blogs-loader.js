// blogs-loader.js

document.addEventListener('DOMContentLoaded', async () => {
    const blogContainer = document.getElementById('blogs-container');
    const articles = await fetchMediumArticles('meg.patakota'); // Replace with Medium username

    if (articles.length) {
        articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'blog-card bg-white rounded-lg shadow-md overflow-hidden';
            
            // Add inline styles for transition effect
            articleCard.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            
            // Create hover effect using JavaScript
            articleCard.addEventListener('mouseover', () => {
                articleCard.style.transform = 'translateY(-0.5rem) scale(1.05)';
                articleCard.style.boxShadow = '0px 10px 15px rgba(0, 0, 0, 0.2)';
            });
            articleCard.addEventListener('mouseout', () => {
                articleCard.style.transform = 'none';
                articleCard.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
            });

            articleCard.innerHTML = `
                <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-contain">
                <div class="p-6">
                    <h3 class="text-xl font-normal mb-2 text-primary">${article.title}</h3>
                    <p class="text-gray-600 mb-4">${article.description}</p>
                    <a href="${article.link}" target="_blank" rel="noopener noreferrer" 
                       class="text-buttons hover:text-secondary font-semibold transition duration-300">
                       Read More →
                    </a>
                </div>
            `;
            blogContainer.appendChild(articleCard);
        });
    } else {
        blogContainer.innerHTML = '<p class="text-center text-gray-500">No articles available at the moment.</p>';
    }
});

async function fetchMediumArticles(username) {
    const rss2jsonURL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;
    const response = await fetch(rss2jsonURL);
    const data = await response.json();

    const articles = data.items.map(item => {
        // Extract the first image URL from the description
        const imgRegex = /<img.*?src="(.*?)"/;
        const imageMatch = imgRegex.exec(item.description);
        const imageUrl = imageMatch ? imageMatch[1] : 'https://via.placeholder.com/150';  // Placeholder if no image found
        
        return {
            title: item.title,
            description: item.description.replace(/<[^>]+>/g, '').substring(0, 100) + '...',
            image: imageUrl,
            link: item.link,
        };
    });

    return articles;
}
