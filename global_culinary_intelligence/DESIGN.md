---
name: Global Culinary Intelligence
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#564337'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#897365'
  outline-variant: '#dcc1b1'
  surface-tint: '#944a00'
  primary: '#944a00'
  on-primary: '#ffffff'
  primary-container: '#e67e22'
  on-primary-container: '#502600'
  inverse-primary: '#ffb783'
  secondary: '#3f5f92'
  on-secondary: '#ffffff'
  secondary-container: '#a6c4fe'
  on-secondary-container: '#315183'
  tertiary: '#006a6a'
  on-tertiary: '#ffffff'
  tertiary-container: '#44a7a7'
  on-tertiary-container: '#003737'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#ffb783'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#713700'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#aac7ff'
  on-secondary-fixed: '#001b3e'
  on-secondary-fixed-variant: '#264779'
  tertiary-fixed: '#93f2f2'
  tertiary-fixed-dim: '#76d6d5'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#004f4f'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  premium-gold: '#d4af37'
  terracotta-dark: '#944a00'
  parchment: '#fdfdfd'
typography:
  display-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  section-gap: 64px
---

## Brand & Style

This design system embodies a **Global Premium Modern** aesthetic, designed to transition seamlessly from a professional culinary academy to a home kitchen. The personality is expert and sophisticated, yet inherently accessible, balancing the authority of a world-class chef with the warmth of communal dining.

The visual style is **Soft Minimalism** with **Corporate Modern** undercurrents. It leverages high-density information architecture—essential for complex recipes and technical lessons—while maintaining a "breathable" feel through elegant whitespace. The emotional response should be one of "Informed Inspiration," where the user feels they are using a precise tool that respects the artistry of food. Visuals are dominated by high-fidelity food photography, treated as the primary "UI texture."

## Colors

The palette is divided into functional "Accents" that guide the user through different platform experiences:

- **Primary (Earthy Orange):** Represents the "Hearth." Used for interactive actions, cooking progress, and appetite-stimulating highlights.
- **Secondary (Deep Navy):** The "International Trust" color. Used for institutional elements, academy certification badges, and global navigation to provide professional grounding.
- **Tertiary (Vibrant Teal):** The "Health & Vitality" marker. Reserved for nutritional data, fresh ingredient highlights, and sustainability metrics.
- **Premium Accent (Gold):** Exclusively used for "Fusion Recipes," premium tier content, and masterclass designations.
- **Neutral (Parchment & Stone):** A sophisticated range of off-whites and light grays that prevent eye fatigue during long-form reading and mimic professional kitchen surfaces.

## Typography

The system utilizes a dual-font strategy to handle global localization with high technical precision. 

- **Primary Headings:** **IBM Plex Sans Arabic** is the lead typeface, providing a structured, modern, and authoritative voice. Its neutral, yet architectural design ensures that both Arabic (RTL) and Latin (LTR) scripts share the same visual weight and personality.
- **Body & Technical Data:** **IBM Plex Sans** (Latin) is used for body copy in Western locales, while the Arabic variant handles Middle Eastern regions. This font family was chosen for its exceptional legibility in high-density data scenarios, such as ingredient lists and nutritional tables.
- **RTL/LTR Switching:** Line heights are standardized across both scripts to ensure that layout grids remain intact when toggling languages. Ensure 150% line-height for body text to accommodate Arabic diacritics.

## Layout & Spacing

The layout employs a **Hybrid Fluid Grid** that prioritizes "High-Density Elegance." 

- **Grid Model:** A 12-column system for desktop and a 4-column system for mobile. 
- **Information Density:** Large, high-quality food imagery acts as the anchor for each page. To balance high-density information (like multi-step lessons), use "White Space Reservoirs"—uninterrupted margins of at least 64px between major content blocks.
- **Adaptive Rules:** On mobile, imagery transitions to a 1:1 or 4:5 aspect ratio to dominate the viewport. On desktop, imagery is often docked to one side (spanning 6-7 columns) while text metadata flows in the adjacent columns to maintain a sophisticated editorial feel.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows** that avoid a "flat" appearance without becoming skeuomorphic.

- **Surfaces:** Use a layered container approach. The base background is `surface-container-lowest`. Lesson cards and recipe modules sit on `surface-container-low`.
- **Shadow Profile:** Shadows are diffused and tinted with the Secondary (Navy) color at 4% opacity to create a "cool" professional lift, rather than a "muddy" black shadow.
- **Glassmorphism:** Use for floating lesson progress bars and top navigation. A backdrop blur of 16px with a 75% white tint ensures the food imagery remains visible as a vibrant texture beneath the interface.

## Shapes

The shape language is **Rounded**, conveying an organic and approachable feel that contrasts with the technical nature of the data. 

- **Main Containers:** Cards for recipes and lessons utilize a 16px (1rem) radius.
- **Interactive Elements:** Buttons and input fields use a soft 8px (0.5rem) radius for a more precise, expert look.
- **Instructional Pills:** Badges for difficulty levels or time requirements use a full pill-shape (999px) to distinguish them from actionable buttons.

## Components

### Kitchen Discovery Cards
These cards feature a prominent regional flag icon in the top-left corner. The card uses a full-bleed image with a gradient overlay (30% black at bottom) to support white typography for the region name.

### Academy Lesson Cards
Designed for high-density information. These include a "Progress Bar" at the bottom of the image area (using Secondary Navy). A "Teacher" avatar and "Difficulty" badge are placed in the metadata area below the image.

### Fusion Recipe Cards
These cards utilize a **Gold border** (2px) and a subtle "Premium" sash in the corner. They use a split-image layout or a 1:1 ratio to highlight the two culinary cultures being merged.

### Buttons
- **Action:** Primary (Orange) background with white text.
- **Trust/Enroll:** Secondary (Navy) background for academy-related actions.
- **Secondary:** Outlined using the `outline-variant` color with a 2px stroke.

### Input Fields & Search
High-density search bars include "Filter Chips" directly below the input field. Chips use a 10% opacity fill of their respective functional color (e.g., Teal for health filters).