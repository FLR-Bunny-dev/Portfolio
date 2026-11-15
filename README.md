# Portfolio - GENESIS AI Assistant

A personal portfolio showcasing the GENESIS offline AI assistant with integrated 3D Orb Gallery visualization.

## Project Structure

```
portfolio/
├── index.html          # Main portfolio page
├── package.json        # Project configuration
├── vite.config.ts      # Vite build configuration
├── src/
│   └── shaders/
│       └── orb-gallery/
│           ├── OrbGallery.tsx  # OrbGallery component
│           └── sources/          # Gallery HTML source
├── public/             # Static assets
└── dist/               # Built output
```

## OrbGallery Component

The `OrbGallery` component renders an interactive sphere of interface references using:
- Three.js r149 for the 3D orb rendering
- Embedded WebP atlas for gallery plates
- DOM/CSS for hover lift and focus dimming
- Inertial drag rotation

**Usage:**
```tsx
import { OrbGallery } from "./src/shaders/orb-gallery/OrbGallery";

export function Scene() {
  return (
    <div className="shader-frame">
      <OrbGallery />
    </div>
  );
}
```

## Running locally

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build
npm run build
```

## Features

- Rotating 3D sphere of interface gallery plates
- Hover lift effects on gallery cards
- Focus dimming on non-active elements
- Inertial drag rotation
- Responsive design
- Accessible with ARIA labels

## Technologies

- React 18
- Three.js r149
- Vite build tool
- Google Fonts (Inter + Instrument Serif)
- Embedded iframes for gallery content
- GitHub Actions for CI/CD

## Deployment

This portfolio is set up for automatic deployment to GitHub Pages.

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file handles:

- **Trigger**: Pushes to `main` or `master` branch
- **Build**: Installs dependencies and runs Vite build
- **Deploy**: Publishes the `dist` folder to GitHub Pages

### Manual Deployment

If you need to deploy manually:

```bash
# Install gh-pages locally
npm install gh-pages

# Add to package.json scripts (if not present):
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### GitHub Settings

1. Go to your repository settings
2. Navigate to "Pages" → "Source"
3. Set source to `deploy branch: gh-pages` or `folder: /(root) /dist`
4. Save and wait a few minutes for the site to publish