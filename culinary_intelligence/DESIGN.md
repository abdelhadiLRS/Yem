---
name: Culinary Intelligence
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
  secondary: '#006d37'
  on-secondary: '#ffffff'
  secondary-container: '#6bfe9c'
  on-secondary-container: '#00743a'
  tertiary: '#4b6076'
  on-tertiary: '#ffffff'
  tertiary-container: '#869bb3'
  on-tertiary-container: '#1d3347'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#ffb783'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#713700'
  secondary-fixed: '#6bfe9c'
  secondary-fixed-dim: '#4ae183'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005228'
  tertiary-fixed: '#cfe5ff'
  tertiary-fixed-dim: '#b3c9e2'
  on-tertiary-fixed: '#051d30'
  on-tertiary-fixed-variant: '#34495e'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: IBM Plex Sans Arabic, ibmPlexSans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans Arabic, ibmPlexSans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: IBM Plex Sans Arabic, ibmPlexSans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: beVietnamPro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: beVietnamPro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: beVietnamPro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  headline-lg-mobile:
    fontFamily: IBM Plex Sans Arabic, ibmPlexSans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  gutter: 16px
  section-gap: 48px
  card-padding: 20px
---

## Brand & Style

The design system is centered on a **Premium Modern** aesthetic that blends the warmth of home cooking with the precision of smart technology. The target audience includes home chefs and health-conscious individuals who value both efficiency and the sensory joy of food.

The UI style leans heavily into **Soft Minimalism** with a focus on tactile, organic shapes. By using generous white space and high-quality imagery, the interface acts as a "canvas" for the vibrant colors of fresh ingredients. The emotional response should be one of calm inspiration, reliability, and appetite stimulation. Key visual markers include hyper-rounded corners (24px+), subtle elevation to suggest physical depth, and a vibrant, nature-inspired palette.

## Colors

This design system utilizes a palette that evokes the kitchen environment:
- **Primary (Terracotta):** Used for primary calls-to-action, active states, and appetite-stimulating accents. It represents heat, spices, and the hearth.
- **Secondary (Sage Green):** Used for health indicators, nutritional labels, and "freshness" markers.
- **Tertiary (Charcoal Blue):** Reserved for high-contrast text and deep interactive elements to ensure professional grounding.
- **Neutral (Parchment & Stone):** Backgrounds use #F9F9F9 to provide a clean, soft surface that is easier on the eyes than pure white, mimicking a clean marble countertop.

## Typography

The typography strategy prioritizes legibility while following recipes in high-activity environments. 
- **Headlines:** Use **IBM Plex Sans Arabic** (and its Latin counterpart) for a structured, professional, and modern feel. The weights are kept bold to establish clear hierarchy against large imagery.
- **Body & Labels:** Use **Be Vietnam Pro**. Its friendly, open counters and contemporary geometric construction make long ingredient lists and cooking steps easy to digest.
- **Bilingual Support:** Ensure vertical metrics are adjusted to prevent Arabic descenders from overlapping with English line heights.

## Layout & Spacing

The layout follows a **Fluid Grid** model designed for mobile-first consumption. 
- **Mobile (Default):** 4-column grid with 24px side margins to allow the UI to "breathe."
- **Tablet/Desktop:** 12-column grid with a max-width of 1280px.
- **Spacing Logic:** Based on an 8px root unit. Larger gaps (48px+) are encouraged between unrelated sections (e.g., between "Featured Recipes" and "Cuisine Categories") to maintain the premium, uncluttered feel.
- **Photography Aspect Ratios:** Recipe cards should strictly follow a 4:5 or 1:1 ratio to maximize visual impact on mobile scrolls.

## Elevation & Depth

This design system uses **Ambient Shadows** to create a sense of soft tactility. Shadows are never pure black; they are tinted with the primary or tertiary color at very low opacities (e.g., `rgba(230, 126, 34, 0.08)`).

- **Level 1 (Resting Cards):** Very soft, wide-spread shadow (Y: 4, Blur: 20) to make cards appear as if they are floating slightly above the parchment background.
- **Level 2 (Active/Modals):** More pronounced shadow (Y: 12, Blur: 30) to pull the element toward the user.
- **Glassmorphism:** Navigation bars and sticky headers utilize a 20px backdrop blur with a 70% white tint to maintain context of the content scrolling beneath them.

## Shapes

The shape language is **Hyper-Rounded**.
- **Standard Radius:** 24px for all main containers and recipe cards.
- **Small Elements:** 12px for input fields and small buttons.
- **Interactive Pills:** Use full `rounded-full` (pill) shapes for category tags and filter chips.
The absence of sharp corners reinforces the "inviting" and "warm" brand personality, making the technology feel approachable and organic.

## Components

### Buttons
- **Primary:** Terracotta fill, white text, 12px or pill-shaped radius. Use a subtle inner-glow for a "pressed" tactile effect.
- **Secondary:** Ghost style with a 2px Sage Green border and Sage Green text.

### Recipe Cards
- **Structure:** Full-bleed image at the top with a 24px radius. Content area below includes a "Save" icon (top right overlay) and a "Time/Difficulty" badge using the pill-shape.
- **Imagery:** Apply a very subtle bottom-to-top dark gradient (15% opacity) on images to ensure white text overlays are legible.

### Dietary Chips
- **Styling:** Small pill-shaped containers. 
- **Coding:** Use Sage Green backgrounds with 10% opacity and 100% opacity text for health-related tags (Vegan, Gluten-Free).

### Input Fields
- **Styling:** #F9F9F9 background with a subtle 1px border that turns Terracotta on focus. Use 16px internal padding for a spacious feel.

### Navigation
- **Mobile:** A floating bottom tab bar with glassmorphic background and 32px corner radius, housing 4-5 primary icons.