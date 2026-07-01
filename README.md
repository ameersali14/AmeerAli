# AI Healthcare Portfolio Website

A premium, professional portfolio website for an AI Healthcare expert built with Next.js 15+ App Router, TypeScript, and Tailwind CSS.

## Features

- Light theme with sophisticated, elegant design
- Premium typography using Inter and Playfair Display fonts
- Fully responsive and mobile-first
- Subtle Framer Motion animations
- Airtable CMS integration for all content
- Contact form with Airtable submission
- SEO optimized with metadata and JSON-LD
- Image optimization using Next.js Image component

## Pages

- **Home** - Hero, About, Featured Portfolio, Latest Insights, Learnings, Quotes, CTA
- **Portfolio** - Filterable project grid with dynamic detail pages
- **Articles** - Article listing with dynamic detail pages
- **Essays** - Essay listing with dynamic detail pages
- **AI News** - News feed from curated sources
- **Learnings** - Key insights from research papers
- **Resources** - Filterable resource collection
- **Videos** - Video gallery with YouTube embeds
- **About** - Full biography and recommended reading
- **Contact** - Contact form with email links

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your Airtable credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Airtable credentials:

```
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
```

### 3. Set Up Airtable

Create an Airtable base with the following tables (exact field names required):

#### Settings Table
- Name (text)
- About Title (text)
- Bio Photo (attachment)
- Biography (long text)
- Bio LinkedIn URL (url)
- Hero Background Image (attachment)
- Hero Title (text)
- Hero Subtitle (text)
- Hero CTA Button Text (text)
- Hero CTA Button URL (url)
- Purpose / Sales Statement (text)
- Site Footer Text (text)

#### Portfolio Table
- Project Title (text)
- Short Description (text)
- Full Description (long text)
- Client / Role (text)
- Category (text)
- Technologies (multiple select)
- Images (attachment)
- Live URL (url)
- Completion Date (date)
- Featured (checkbox)

#### Articles Table
- Title (text)
- Excerpt (text)
- Thumbnail Image (attachment)
- Publish Date (date)
- Tags (multiple select)
- Featured (checkbox)
- LinkedIn URL (url)

#### Essays Table
- Title (text)
- Cover Image (attachment)
- Excerpt (text)
- Full Content (long text)
- Publish Date (date)
- Slug (text)
- Featured (checkbox)

#### Videos Table
- Title (text)
- Category (text)
- Description (text)
- Publish Date (date)
- Thumbnail (attachment)
- Video URL (url)

#### AI News Table
- Title (text)
- Image (attachment)
- Publish Date (date)
- Source (text)
- Summary (text)
- Tags (multiple select)
- URL (url)

#### Resources Table
- Resource Name (text)
- Category (text)
- Description (text)
- Extra Details (text)
- Logo / Image (attachment)
- URL (url)
- Featured (checkbox)

#### Learnings Table
- Title (text)
- Featured (checkbox)
- Key Lessons / Summary (long text)
- Publish Date (date)
- Source (text)
- White Paper URL (url)

#### Curated Readings Table
- Title (text)
- Author (text)
- Category (text)
- Cover Image (attachment)
- URL (url)
- Why I Recommend It (text)

#### Quotes Table
- Quote Text (long text)
- Author (text)
- Category (text)
- Featured (checkbox)
- Source / Context (text)

#### Contacts Table (for form submissions)
- Name (text)
- Email (email)
- Subject (text)
- Message (long text)
- Date (date)

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── api/contact/route.ts          # Contact form API endpoint
├── articles/
│   ├── page.tsx                  # Articles listing
│   └── [slug]/page.tsx           # Article detail
├── essays/
│   ├── page.tsx                  # Essays listing
│   └── [slug]/page.tsx           # Essay detail
├── portfolio/
│   ├── page.tsx                  # Portfolio listing with filters
│   └── [slug]/page.tsx           # Project detail
├── ai-news/page.tsx              # AI News feed
├── learnings/page.tsx            # Learnings listing
├── resources/page.tsx            # Resources with filters
├── videos/page.tsx               # Video gallery
├── about/page.tsx                # About page
├── contact/page.tsx              # Contact form
├── layout.tsx                    # Root layout with header/footer
├── page.tsx                      # Home page
└── not-found.tsx                 # 404 page

components/
├── layout/
│   ├── Header.tsx                # Navigation header
│   └── Footer.tsx                # Site footer
├── sections/
│   ├── HeroSection.tsx           # Home hero
│   ├── AboutSection.tsx          # Home about preview
│   ├── FeaturedPortfolioSection.tsx
│   ├── InsightsSection.tsx       # Articles & Essays preview
│   ├── LearningsSection.tsx      # Learnings preview
│   ├── QuotesSection.tsx         # Featured quote
│   └── CTASection.tsx            # Final CTA
└── ui/                           # UI components (buttons, cards, etc.)

lib/
├── airtable.ts                   # Airtable fetch utilities
├── data.ts                       # Data fetching functions
└── utils.ts                      # Utility functions

types/
├── airtable.ts                   # TypeScript interfaces
└── index.ts                      # Type exports
```

## Customization

All content is managed through Airtable. Simply update records in your Airtable base to:

- Update site settings (name, bio, hero content)
- Add/edit portfolio projects
- Publish articles and essays
- Share learnings and resources
- Curate AI news and quotes

The site automatically reflects changes from Airtable.

## Technologies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui components
- Lucide React icons
- Airtable API

## License

MIT
