You are a senior Technical SEO engineer and frontend performance engineer.

I have an existing personal developer portfolio website. Your job is to audit the entire existing codebase and optimize it for **maximum technical SEO, search visibility, performance, accessibility, semantic HTML, and crawlability** without changing the existing visual design or breaking any functionality.

## IMPORTANT RULES

- Do NOT redesign the website.
- Do NOT change the existing UI unnecessarily.
- Do NOT remove existing features.
- Preserve the current layout, animations, branding, colors, typography, and user experience.
- Only make changes that improve SEO, performance, accessibility, maintainability, or code quality.
- Reuse the existing architecture and components whenever possible.
- Do not add unnecessary dependencies.
- Do not create fake content or fake SEO keywords.
- Do not keyword-stuff.
- All SEO content must sound natural and professional.
- First inspect the entire project before making changes.

---

# 1. FULL SEO AUDIT

First analyze the complete codebase and identify:

- Current framework and rendering strategy
- SSR / SSG / CSR usage
- Existing metadata implementation
- Existing sitemap
- robots.txt
- canonical URLs
- Open Graph metadata
- Twitter/X card metadata
- Structured data / JSON-LD
- Heading hierarchy
- Image optimization
- Internal linking
- URL structure
- JavaScript rendering issues
- Crawlability issues
- Duplicate content
- Missing metadata
- Accessibility issues affecting SEO
- Performance bottlenecks
- Unnecessary JavaScript
- Unused CSS
- Layout shift issues
- Missing alt text
- Poor semantic HTML
- Mobile SEO issues

Before modifying anything, provide a short summary of the important problems you found.

---

# 2. PAGE-LEVEL SEO

For every important page/route, implement proper unique SEO metadata.

Each page should have:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph title
- Open Graph description
- Open Graph URL
- Open Graph image
- Open Graph type
- Twitter/X card metadata
- Appropriate robots directives
- Relevant keywords only where useful
- Proper language declaration

Create SEO metadata based on the actual content of each page.

Do NOT use the same title and description for every page.

For example, the homepage should clearly communicate that this is a professional developer portfolio and what services/expertise are offered.

---

# 3. HOMEPAGE SEO

Optimize the homepage around the actual professional identity and services represented by the website.

The homepage should clearly communicate:

- Who I am
- What I do
- My technical expertise
- What type of products/applications I build
- Who I work with
- My professional value
- How visitors can contact me

Use natural semantic keywords such as:

- Full Stack Developer
- MERN Stack Developer
- TypeScript Developer
- React Developer
- Node.js Developer
- SaaS Development
- AI-powered applications
- Web application development
- API development
- Software development

Only use keywords where they naturally match the actual website content.

Avoid keyword stuffing.

---

# 4. SEMANTIC HTML

Audit the entire website and replace non-semantic HTML where appropriate.

Use:

- header
- nav
- main
- section
- article
- aside
- footer

Ensure there is:

- One clear H1 per important page
- Proper H2/H3 hierarchy
- No skipped heading levels unnecessarily
- Descriptive link text
- Semantic buttons
- Accessible navigation

Do not use div/span elements where a semantic element is more appropriate.

---

# 5. STRUCTURED DATA / JSON-LD

Implement appropriate Schema.org structured data.

At minimum, consider:

- Person
- WebSite
- WebPage
- BreadcrumbList where applicable
- ProfessionalService where appropriate

For the Person schema, use real information already present on the website.

Potential fields:

- name
- jobTitle
- url
- image
- description
- sameAs
- knowsAbout
- worksFor

Do NOT invent information.

Use JSON-LD properly and avoid duplicate/conflicting structured data.

---

# 6. SOCIAL SEO

Implement proper Open Graph and Twitter/X metadata.

Make sure shared links generate a professional preview.

Include:

- og:title
- og:description
- og:image
- og:url
- og:type
- twitter:card
- twitter:title
- twitter:description
- twitter:image

Use an appropriate portfolio/social preview image if one already exists.

---

# 7. CANONICAL URL

Implement canonical URLs correctly.

Every indexable page should have a self-referencing canonical URL unless there is a legitimate reason otherwise.

Prevent duplicate URLs caused by:

- trailing slashes
- query parameters
- alternate routes
- duplicate pages

Use the actual production domain.

Do not hardcode localhost URLs into production metadata.

---

# 8. SITEMAP

Create or optimize a proper XML sitemap.

Include only indexable, canonical pages.

Exclude:

- admin pages
- private pages
- authentication pages
- duplicate URLs
- unnecessary query URLs
- 404 pages

Make sure the sitemap is accessible from:

/sitemap.xml

If the framework supports dynamic sitemap generation, use the framework's recommended implementation.

Ensure the sitemap uses the production domain.

---

# 9. ROBOTS.TXT

Create or optimize:

/robots.txt

Allow search engines to crawl all public pages.

Disallow private/non-public routes such as:

- /admin
- /dashboard
- /auth
- private API routes
- internal application routes

Reference the sitemap correctly.

Do not accidentally block CSS, JS, images, or other resources required for rendering.

---

# 10. INTERNAL LINKING

Improve internal linking naturally.

Important pages should be reachable through normal HTML links.

Create logical connections between:

- Home
- About
- Projects
- Services
- Skills
- Experience
- Contact

Use descriptive anchor text.

Avoid generic anchor text such as "Click here" whenever a descriptive alternative makes sense.

---

# 11. IMAGE SEO

Audit every image.

For every meaningful image:

- Add descriptive alt text
- Use appropriate width/height
- Prevent layout shifts
- Use modern image formats when possible
- Lazy-load below-the-fold images
- Do not lazy-load the main LCP image
- Add proper loading/decoding attributes where appropriate

Decorative images should use appropriate empty alt attributes.

Do not put keywords unnaturally into alt text.

---

# 12. CORE WEB VITALS / PERFORMANCE

Optimize the website for:

- LCP
- INP
- CLS

Look for:

- Large JavaScript bundles
- Unnecessary client-side rendering
- Heavy dependencies
- Large images
- Render-blocking resources
- Unnecessary animations
- Layout shifts
- Fonts loading inefficiently
- Excessive DOM elements
- Duplicate API requests

Optimize without changing the visual experience.

Prioritize the critical rendering path.

---

# 13. JAVASCRIPT OPTIMIZATION

Audit client-side JavaScript.

Identify components that do not need to run on the client.

Where the framework supports it:

- Prefer server rendering where appropriate
- Reduce client components
- Lazy-load non-critical components
- Code-split heavy sections
- Dynamically import expensive libraries
- Remove unnecessary JavaScript
- Avoid unnecessary hydration

Do not convert components blindly. Preserve functionality.

---

# 14. CSS OPTIMIZATION

Audit CSS/Tailwind usage.

Look for:

- unused styles
- duplicated classes
- unnecessarily large CSS
- expensive animations
- unnecessary global styles

Optimize CSS without changing the current design.

---

# 15. FONT OPTIMIZATION

Optimize font loading.

Use:

- proper font-display
- preload only critical fonts
- avoid unnecessary font weights
- avoid loading unused font families
- minimize layout shift caused by fonts

Preserve the existing typography.

---

# 16. ACCESSIBILITY

Improve accessibility because it also supports SEO and usability.

Check:

- image alt text
- keyboard navigation
- focus states
- button labels
- form labels
- aria attributes
- color contrast
- heading structure
- semantic HTML
- screen-reader accessibility

Do not add unnecessary ARIA attributes where native HTML already provides the correct semantics.

---

# 17. URL & ROUTING SEO

Audit every public route.

Make URLs:

- descriptive
- readable
- stable
- lowercase
- SEO-friendly

Avoid unnecessary parameters and duplicate routes.

Implement redirects only when necessary.

Make sure invalid URLs return a proper 404 response/page.

---

# 18. 404 PAGE

Create/optimize a proper SEO-friendly 404 page.

It should:

- clearly indicate the page was not found
- provide navigation back to important pages
- preserve the site's branding
- return the correct HTTP 404 status

Do not allow nonexistent pages to return HTTP 200.

---

# 19. SECURITY + SEO

Check that security configurations do not accidentally prevent legitimate search engine crawling.

Review:

- headers
- CSP
- robots rules
- canonical configuration
- public assets
- API exposure

Do not expose sensitive information.

---

# 20. CODE QUALITY

While working on SEO, clean up obvious code-quality issues.

Look for:

- duplicated code
- unused imports
- unused components
- unnecessary API calls
- unnecessary state
- unnecessary effects
- console logs
- dead code
- inconsistent metadata
- poor component structure

Do not perform a huge unnecessary refactor.

Keep the changes focused.

---

# 21. PRODUCTION DOMAIN

Use the actual production domain consistently throughout:

- canonical URLs
- sitemap
- robots.txt
- Open Graph URLs
- structured data
- internal absolute URLs where necessary

Do not use localhost or development URLs in production SEO metadata.

---

# 22. SEO CONTENT

Improve existing content where necessary so search engines can clearly understand:

- my professional identity
- my expertise
- services
- projects
- technologies
- experience
- business value

Do not create meaningless SEO paragraphs.

Content should be written for humans first and search engines second.

---

# 23. GOOGLE SEARCH CONSOLE READINESS

Make the website ready for Google Search Console.

Check:

- sitemap accessibility
- robots.txt
- canonical URLs
- indexability
- mobile usability
- structured data
- HTTP status codes
- internal links
- metadata

Do not claim that the site is indexed unless it can actually be verified.

---

# 24. FINAL VALIDATION

After implementing the changes, perform another complete audit.

Verify:

- Build succeeds
- No TypeScript errors
- No lint errors
- No broken routes
- No broken links
- No console errors
- Sitemap works
- robots.txt works
- Metadata is correct
- Canonicals are correct
- JSON-LD is valid
- Images have appropriate alt text
- No accidental UI changes
- No functionality is broken

Run the project's existing build/lint/typecheck commands.

---

# FINAL REPORT

After completing the work, give me a concise report with:

1. SEO problems found
2. SEO improvements implemented
3. Technical SEO improvements
4. Performance improvements
5. Accessibility improvements
6. Structured data added
7. Sitemap/robots changes
8. Important files changed
9. Any remaining issues
10. Recommended next steps for Google Search Console

Most importantly:

**Do not just add meta tags. Optimize the actual architecture and code so that search engines can properly crawl, understand, render, and index the portfolio.**

Keep the existing design and functionality intact.
