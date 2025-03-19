# AI-Powered Advertising Platform

An MVP platform for advertising agencies that want to be AI-innovative. This platform helps clients manage campaigns and analyze competitors with automation and AI-powered insights.

## Features

### Campaign Status Tracker
- Real-time updates on campaign progress
- Visual tracking of campaign stages (brief sent → proposal received → campaign start → creative optimization → completion)
- Searchable campaign database with client and platform filters

### Performance Dashboard
- Multi-channel analytics (Google, Facebook, TikTok, Telegram Ads)
- AI-generated insights for performance improvements
- Budget optimization recommendations
- Visual charts and metrics for key performance indicators

### Competitor Intelligence
- Automated competitor analysis
- Data integration with Google Transparency and Facebook Ad Library
- Detailed competitor ad creative tracking
- AI-driven strategic insights and benchmarking

## Tech Stack

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **Charts**: Chart.js, Recharts
- **UI Components**: Headless UI
- **Icons**: Heroicons

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/(dashboard)/*` - Dashboard pages
  - `campaigns/` - Campaign Status Tracker
  - `performance/` - Performance Dashboard
  - `competitors/` - Competitor Intelligence
- `src/components/*` - Reusable components
  - `layout/` - Layout components (sidebar, header)
  - `dashboard/` - Dashboard-specific components
  - `campaigns/` - Campaign-specific components
  - `competitors/` - Competitor-specific components

## Future Enhancements

The platform is designed with a scalable foundation that can be expanded with advanced AI features such as:

- AI-generated creative suggestions
- Predictive budget allocation
- Automated campaign optimization
- Natural language querying for ad performance
- Advanced competitor tracking with sentiment analysis

## License

This project is licensed under the MIT License - see the LICENSE file for details.
