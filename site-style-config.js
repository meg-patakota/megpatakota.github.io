// tailwind-config.js
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', 'Montserrat', 'sans-serif'],  // Dynamic Font Family from Tailwind
            },
            colors: {
                primary: '#005f73',
                key_info_text: '#ffffff',
                secondary: '#005f73',
                project_box: '#e6ecef',
                buttons: '#005f73',
                buttons_text: '#ffffff',
                primary_text: '#f7f1de',
                text_color: '#333333',
                bg: '#005f73',               // Dark navy background for depth and contrast
                header_text: '#005f73',       // Warm, muted orange for header text accents
            }
        }
    }
};
