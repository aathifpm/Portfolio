# Aathif Jameel PM - Portfolio Website

A modern, responsive portfolio website showcasing skills, projects, experience, and education.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations and transitions
- Interactive navigation
- Project showcase section
- Skills display
- Experience timeline
- Contact form
- Social media integration

## Technologies Used

- HTML5
- CSS3 with modern features (Grid, Flexbox, CSS Variables)
- JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts

## Setup and Installation

1. Clone or download this repository
2. Navigate to the project folder
3. Open `index.html` in your web browser

For local development with XAMPP:
1. Place the project folder in your XAMPP's `htdocs` directory
2. Start the Apache server
3. Access the website via `http://localhost/my_portfolio`

## Customization

### Changing Colors

The color scheme can be modified in the `css/styles.css` file by changing the CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    --dark-color: #1e293b;
    --light-color: #f8fafc;
    --gray-color: #64748b;
    /* other colors */
}
```

### Adding Projects

To add new projects, duplicate the project card structure in the HTML file:

```html
<div class="project-card">
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description.</p>
        <div class="project-tags">
            <span>Tag 1</span>
            <span>Tag 2</span>
        </div>
    </div>
</div>
```

### Profile Image (Optional)

To add a profile image:
1. Place your image in the `assets/images` folder
2. Add the image to the about section in `index.html`

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is open-source and available for personal and commercial use.

## Credits

- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

## Contact

For any questions or suggestions, please contact Aathif Jameel PM at aathifpm123@gmail.com. 