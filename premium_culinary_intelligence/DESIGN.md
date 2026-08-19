---
name: Premium Culinary Intelligence
colors:
  surface: '#eefcfd'
  surface-dim: '#cfdddd'
  surface-bright: '#eefcfd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f6f7'
  surface-container: '#e3f0f1'
  surface-container-high: '#ddebec'
  surface-container-highest: '#d8e5e6'
  on-surface: '#121e1f'
  on-surface-variant: '#564337'
  inverse-surface: '#263334'
  inverse-on-surface: '#e6f3f4'
  outline: '#897365'
  outline-variant: '#dcc1b1'
  surface-tint: '#944a00'
  primary: '#944a00'
  on-primary: '#ffffff'
  primary-container: '#e67e22'
  on-primary-container: '#502600'
  inverse-primary: '#ffb783'
  secondary: '#635e53'
  on-secondary: '#ffffff'
  secondary-container: '#e9e2d3'
  on-secondary-container: '#696458'
  tertiary: '#4e6073'
  on-tertiary: '#ffffff'
  tertiary-container: '#889bb0'
  on-tertiary-container: '#213344'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#ffb783'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#713700'
  secondary-fixed: '#e9e2d3'
  secondary-fixed-dim: '#cdc6b8'
  on-secondary-fixed: '#1e1b13'
  on-secondary-fixed-variant: '#4b463c'
  tertiary-fixed: '#d1e4fb'
  tertiary-fixed-dim: '#b5c8df'
  on-tertiary-fixed: '#091d2e'
  on-tertiary-fixed-variant: '#36485b'
  background: '#eefcfd'
  on-background: '#121e1f'
  surface-variant: '#d8e5e6'
typography:
  display-lg:
    fontFamily: IBM Plex Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
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
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for a premium culinary ecosystem that merges the warmth of high-end hospitality with the precision of modern AI. The personality is "Gourmet Technical"—it is inviting and appetizing, yet maintains a sophisticated, structured feel that signals technological reliability.

The aesthetic follows a **Modern-Organic** style. It utilizes heavy whitespace, high-quality food photography as a core UI element, and a sophisticated layering system. It avoids the clinical feel of traditional SaaS by using warm neutrals and "soft-touch" surfaces, while maintaining rigor through a systematic grid and crisp typography. The emotional goal is to make the user feel like they are interacting with a world-class concierge who is both knowledgeable and approachable.

## Colors

The palette is anchored by a vibrant Primary Orange, evoking appetite and energy. This is balanced by a sophisticated Secondary Cream that provides a "paper-like" warmth in light mode, preventing the interface from feeling stark.

**Light Mode:**
- **Surface (Primary):** #FDF5E6 (Cream) - used for the base background.
- **Surface (Secondary):** #FFFFFF - used for cards and elevated components to create subtle contrast.
- **On-Surface:** #1A1A1A - a deep charcoal for maximum legibility.

**Dark Mode:**
- **Surface (Primary):** #121212 - the base depth.
- **Surface (Secondary):** #1E1E1E - used for container elements.
- **Accent:** Primary Orange maintains its vibrancy but utilizes slightly increased saturation for accessibility.

**High-Contrast Accents:**
- **Deep Navy (#2C3E50):** Used for navigation bars or primary action headers to provide a premium, authoritative grounding.

## Typography

The design system exclusively uses **IBM Plex Sans** to bridge the gap between humanistic warmth and technical precision. 

- **Hierarchy:** Display styles use tight tracking and bold weights to feel impactful and editorial.
- **Readability:** Body text utilizes the regular weight with generous line heights to ensure long-form recipes or AI insights remain comfortable to read.
- **Functionality:** Label styles use medium or semi-bold weights with slight tracking increases to maintain clarity at small sizes on technical dashboards.

## Layout & Spacing

This design system employs an **8px linear scale** for all spacing and layout decisions. The layout philosophy is a **Responsive Fluid Grid** that transitions from a 4-column structure on mobile to a 12-column structure on desktop.

- **Mobile:** 16px side margins with 16px gutters. Components are mostly full-width to maximize touch targets.
- **Tablet:** 24px side margins with 24px gutters. Content begins to side-car (e.g., image next to text).
- **Desktop:** A max-width container of 1280px centers the content, using 40px margins to provide a high-end, "gallery" feel.

Vertical rhythm is strictly enforced via the 8px unit, ensuring that white space feels intentional and "breathable," echoing the layout of a premium cookbook.

## Elevation & Depth

Hierarchy is communicated through **Tonal Layering** and **Soft Ambient Shadows**. 

1.  **Level 0 (Base):** The primary background color (Cream in Light, Deep Grey in Dark).
2.  **Level 1 (Cards):** Slightly elevated using a very soft, large-radius shadow (Blur: 20px, Y: 4px, Opacity: 4% Black). In dark mode, elevation is shown via a subtle inner border (1px, 10% white) rather than shadow.
3.  **Level 2 (Modals/Popovers):** Higher elevation with a more pronounced shadow and a 10% opacity tint of the Primary Orange in the shadow itself to create a "glow" effect.

**Glassmorphism** is reserved for global navigation bars and sticky headers, using a 12px backdrop blur to allow content colors to bleed through, maintaining a sense of place.

## Shapes

The shape language is defined by **Rounded (Radius 8px to Full)**. 

- **Small Components:** Checkboxes and small tags use a 4px (Soft) radius to maintain precision.
- **Standard Components:** Buttons, Input Fields, and Cards use an 8px (Rounded) radius, providing a friendly but sturdy feel.
- **Interactive/Social Elements:** Search bars, "Add" buttons, and profile avatars use the **Pill (Full)** radius to encourage interaction and denote "soft" touchpoints.

This mix of radii ensures that functional elements feel structured, while social and interactive elements feel approachable.

## Components

**Buttons:**
- **Primary:** Filled with Primary Orange (#E67E22), white text, 8px radius. On hover, they shift 2px up with a slight glow.
- **Secondary:** Outlined with a 2px stroke of Primary Orange or Deep Navy, depending on the context.

**Input Fields:**
- Large 56px height for a premium feel. Background is a subtle tint of the primary neutral. Focus state triggers a 2px Primary Orange border and a soft outer glow.

**Cards:**
- Utilized for recipes and social posts. They feature a "Media-First" design where imagery takes up the top 60% of the card. Content below uses the Headline-SM style for titles.

**Chips/Tags:**
- Used for dietary preferences (e.g., "Vegan", "Gluten-Free"). These use a Pill-shape with a light Primary Orange background (10% opacity) and deep orange text.

**AI Interaction:**
- Components driven by AI (like recipe suggestions) feature a subtle gradient border using Primary Orange and the Tertiary Navy to distinguish them from static content.