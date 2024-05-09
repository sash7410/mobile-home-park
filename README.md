## Project Overview
## North Carolina Mobile Home Parks Map

This project is a simple Next.js application integrated with the Google Maps API to display mobile home parks across North Carolina. It allows users to interact with the map, zoom, pan, and click on markers to get more information about each park. Additional features include search functionality and filtering based on park attributes like size and amenities.

## Features
- Google Maps Integration: Displays a map centered on North Carolina.
- Interactive Markers: Markers on the map represent mobile home parks. Users can click these to view detailed information.
- Search Functionality: Users can search for parks by name to quickly find specific locations.
- Dynamic Filtering: Filters allow users to view parks that meet specific criteria, such as size or available amenities.
  
## Setup Instructions
## Prerequisites
- Node.js installed on your machine
- A Google Maps API key
  
## Installation
- Clone the repository:
```bash
git clone git@github.com:sash7410/mobile-home-park.git;
cd mobile-home-park;
```

- Install dependencies:
```bash
npm install
```

## Set up environment variables:
- Create a .env.local file in the root directory.
- Add your Google Maps API key to the file:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```
- Run the development server:
```bash
npm run dev
```
- Visit http://localhost:3000 in your browser to view the app.
  
## Usage Instructions
- Navigating the Map: Use mouse controls or touch gestures to pan and zoom the map.
- Viewing Park Information: Click on any park marker to open an information window with details about the park.
- Using Search and Filters:
- Search: Enter the name of a park in the search bar to filter markers dynamically as you type.
- Filters: Select from the dropdown options to filter parks by sizes and amenities. Multiple selections are supported for comprehensive filtering.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
