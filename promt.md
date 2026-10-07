Add a floating WhatsApp contact button to the right side of the portfolio website.

### Position

- Place the WhatsApp button on the right side of the viewport.
- Keep it vertically centered or slightly below the center.
- It should remain fixed while the user scrolls.
- Make sure it does not interfere with the existing right sidebar/navigation.
- On desktop, position it slightly outside or beside the main content/sidebar area so it feels naturally integrated with the editorial layout.

### Design

Keep the design minimal and premium to match the existing portfolio branding.

Brand system:

- Background: #121212
- Primary text: #FAFAFA
- Secondary text: #9D9D9D
- Font: Instrument Sans

For the WhatsApp button:

- Use a simple WhatsApp icon.
- Keep the button compact rather than creating a large floating widget.
- Use a subtle circular or rounded-square container.
- Add a thin subtle border.
- Avoid excessive shadows or bright UI treatments.
- The icon can use the standard WhatsApp green only if necessary for recognition; otherwise keep it monochrome to match the portfolio.

### Interaction

The entire button should be clickable.

When clicked, open my WhatsApp chat in a new tab using:

https://wa.me/8801852024152

Replace `YOUR_PHONE_NUMBER` with my actual WhatsApp number in international format without `+`, spaces, or dashes.

Example:

https://wa.me/8801852024152

Use:

target="\_blank"
rel="noopener noreferrer"

### Hover Effect

On hover:

- Slightly increase the button size or scale
- Brighten the icon
- Show a small tooltip/text such as:

"Let's Talk on WhatsApp"

The tooltip should appear toward the right side of the button so it does not go outside the viewport.

Keep the animation subtle and smooth.

### Mobile

On mobile:

- Keep the WhatsApp button fixed.
- Position it at the bottom-right corner instead of the right side.
- Make sure it does not overlap important content or the mobile navigation.
- Keep it compact and easily accessible.

### Accessibility

- Add an accessible aria-label:

"Contact me on WhatsApp"

- The button must be keyboard accessible.
- Use a proper `<a>` element instead of a clickable `<div>`.

### Important

Do not modify the existing portfolio layout, typography, spacing, colors, navigation, or content.

Only add the WhatsApp contact button and its interactions.

The final result should feel like a natural part of the premium editorial portfolio rather than a generic floating chat widget.
