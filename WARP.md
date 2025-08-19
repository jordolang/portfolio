# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Jordan Lang's personal portfolio website - a modern, responsive portfolio built with Next.js 15, TypeScript, and Tailwind CSS featuring stunning animations and dark/light theme support.

## Development Commands

### Essential Commands
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

## Architecture Overview

### Next.js 15 Structure
- **App Router**: Uses Next.js App Router with `src/app/` directory
- **Layout System**: Root layout in `src/app/layout.tsx` with metadata and providers
- **Single Page Application**: Main portfolio content in `src/app/page.tsx`

### Component Organization
```
src/components/
├── portfolio/           # Main portfolio sections
│   ├── HeroSection.tsx     # Landing section with animations
│   ├── OverviewSection.tsx # About/overview content
│   ├── TechStackSection.tsx # Skills and technologies
│   ├── ExperienceSection.tsx # Professional timeline
│   ├── ProjectsSection.tsx # Project showcase
│   ├── TestimonialsSection.tsx # Client testimonials
│   ├── ContactSection.tsx  # Contact form and info
│   ├── Navigation.tsx     # Top navigation bar
│   ├── Background.tsx     # Animated background
│   ├── Footer.tsx         # Site footer
│   └── index.ts          # Component exports
├── ThemeProvider.tsx    # Dark/light theme context
├── ThemeToggle.tsx      # Theme switcher component
├── PostHogProvider.tsx  # Analytics provider
└── AnimatedBackground.tsx # Background animations
```

### Key Architecture Patterns
- **Modular Sections**: Each portfolio section is a separate component for maintainability
- **Theme System**: Context-based theme switching with localStorage persistence
- **Animation Layer**: Framer Motion integrated throughout for smooth transitions
- **Analytics Integration**: PostHog and Google Analytics for user tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## Technology Stack

### Core Technologies
- **Next.js 15.3**: React framework with App Router and server components
- **TypeScript**: Full type safety with strict configuration
- **React 18**: Latest React features including concurrent rendering
- **Tailwind CSS**: Utility-first CSS with custom animations and theme system

### Animation & UI
- **Framer Motion 12.12**: Advanced animation library for smooth effects
- **Radix UI**: Accessible component primitives for tooltips and separators
- **Lucide React**: Modern icon library
- **React Icons**: Additional icon sets

### Analytics & Email
- **PostHog**: Product analytics and user tracking
- **EmailJS**: Client-side email sending for contact forms
- **Google Analytics**: Web traffic analysis

### Development Tools
- **ESLint**: Next.js and TypeScript linting configuration
- **PostCSS**: CSS processing with Autoprefixer
- **Turbopack**: Fast development server bundler

## Environment Configuration

### Required Environment Variables
Create a `.env` file based on `env-example`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

### Configuration Files
- **`tailwind.config.js`**: Custom theme, colors, animations, and keyframes
- **`next.config.ts`**: API rewrites for PostHog, resume endpoints, and routing
- **`tsconfig.json`**: TypeScript configuration with path aliases (`@/*` → `./src/*`)
- **`eslint.config.mjs`**: Next.js and TypeScript linting rules

## Content Customization

### Personal Information
Update personal details in these components:
- **Navigation.tsx**: Name and navigation links
- **HeroSection.tsx**: Main title, subtitle, and introduction
- **OverviewSection.tsx**: About section content and background
- **ContactSection.tsx**: Email, phone, location, and social links

### Portfolio Content
- **ProjectsSection.tsx**: Project showcase with title, description, tech stack, and links
- **TechStackSection.tsx**: Skills organized by categories (Frontend, Backend, etc.)
- **ExperienceSection.tsx**: Professional timeline with roles, companies, and achievements
- **TestimonialsSection.tsx**: Client feedback and testimonials

### Styling and Theming
- **Colors**: Modify color schemes in `tailwind.config.js`
- **Animations**: Custom keyframes and animations defined in Tailwind config
- **Fonts**: Space Grotesk font loaded in `layout.tsx`
- **Theme Toggle**: Automatic dark/light mode detection with manual override

## Deployment

### Vercel Deployment
As per user preferences, this project uses Vercel for deployment:

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Environment Variables in Production
Configure the following in Vercel dashboard:
- EmailJS credentials for contact form
- PostHog analytics keys
- Any custom domain settings

### Build Optimization
- Next.js automatic optimization for production builds
- Image optimization for public assets
- CSS purging via Tailwind for smaller bundle sizes
- TypeScript compilation for type checking

## Branch Strategy

Per user rules, work should be done on the `development` branch:
- **main**: Production-ready code
- **development**: Active development and new features

Always create changes in the development branch before merging to main.

## Special Features

### Analytics Integration
- **PostHog**: Product analytics with custom event tracking
- **Google Analytics**: Standard web analytics (GA4)
- **API Rewrites**: Next.js rewrites for PostHog endpoints in `next.config.ts`

### Animation System
- **Framer Motion**: Page transitions and component animations
- **Custom CSS**: Tailwind-based keyframe animations (pulse-glow, float, gradient-shift)
- **Interactive Effects**: Hover animations and scroll-triggered effects

### Contact System
- **EmailJS Integration**: Client-side email sending without backend
- **Form Validation**: Built-in validation for contact form
- **Resume Download**: API endpoint for CV/resume access

## Important Notes

- **Development Server**: Uses Turbopack for faster builds in development
- **Theme Persistence**: Theme choice saved to localStorage
- **SEO Optimization**: Comprehensive metadata in `layout.tsx`
- **Type Safety**: Strict TypeScript configuration throughout
- **Component Exports**: Centralized exports via `src/components/portfolio/index.ts`

## Troubleshooting

### Common Issues
- **Environment Variables**: Ensure `.env` file exists and contains all required variables
- **Theme Issues**: Check if dark mode classes are properly applied
- **Animation Problems**: Verify Framer Motion components are client-side rendered
- **Build Errors**: Run `npm run lint` to check for TypeScript/ESLint issues
