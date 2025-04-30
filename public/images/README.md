# Images Directory

This directory contains all the images used in the Querencia website. You can add, replace, or modify images in this folder and reference them in your code.

## How to Use Images

1. **Add Images**: Place your image files in this directory or create subdirectories for better organization.

2. **Reference Images**: In your components, reference images using the path starting with `/images/`:

\`\`\`jsx
<img src="/images/your-image.jpg" alt="Description of image" />
\`\`\`

3. **Background Images**: For CSS background images, use the same path format:

\`\`\`jsx
<div style={{ backgroundImage: "url('/images/your-background.jpg')" }}></div>
\`\`\`

## Image Optimization

For better performance, consider the following:

- Use modern image formats like WebP when possible
- Optimize image sizes before adding them to the project
- Use appropriate dimensions for different screen sizes

## Recommended Image Files

Here are the recommended images to add to this directory:

1. `hero-background.jpg` - Main hero section background (1920x1080px recommended)
2. `querencia-logo.webp` - Project logo for the navbar
3. `residence-1.jpg` to `residence-4.jpg` - Property type images
4. `gallery-1.jpg` to `gallery-6.jpg` - Gallery section images
5. `amenity-1.jpg` to `amenity-4.jpg` - Images for amenities (optional)

## Example Directory Structure

\`\`\`
public/
└── images/
    ├── hero-background.jpg
    ├── querencia-logo.webp
    ├── residences/
    │   ├── residence-1.jpg
    │   ├── residence-2.jpg
    │   └── ...
    ├── gallery/
    │   ├── gallery-1.jpg
    │   ├── gallery-2.jpg
    │   └── ...
    └── amenities/
        ├── amenity-1.jpg
        └── ...
