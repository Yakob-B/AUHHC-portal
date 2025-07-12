# Ambo Portal

A modern, interactive university portal for the Hachalu Hundessa Campus, built with React and Tailwind CSS. This portal allows users to explore schools, departments, and career opportunities, with a focus on a beautiful UI, dark/light mode, and engaging interactive features.

## Features

- **Home Page**: Welcome cards, search bar for departments, featured departments, campus statistics, and more.
- **Schools & Institutes**: Browse all schools with animated counters, tooltips, and progress bars.
- **Departments**: View departments within each school, with career opportunities and detailed department pages.
- **Department Details**: Collapsible sections for overview, career paths, related departments, and quick actions.
- **Interactive UI**: Animated cards, counters, tooltips, notifications, and collapsible content.
- **Dark/Light Mode**: Toggle between dark and light themes with full Tailwind support.
- **Responsive Design**: Works great on desktop and mobile devices.

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (v6 or higher)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ambo-portal
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
4. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  App.js                # Main app component and routes
  HomePage.jsx          # Home page with cards, search, featured departments
  SchoolsPage.jsx       # List of schools and statistics
  DepartmentsPage.jsx   # Departments within a school
  DepartmentDetailPage.jsx # Detailed department info
  components/           # Reusable UI components (NavBar, InteractiveCard, etc.)
  schools.json          # Data for schools and departments
public/
  index.html            # Main HTML file
```

## Customization
- **Data**: Update `src/schools.json` to add or modify schools, departments, and career opportunities.
- **Styling**: Tailwind CSS is used for all styling. Edit `tailwind.config.js` for theme changes.
- **Components**: Reusable components are in `src/components/` for easy extension.

## Scripts
- `npm start` – Start the development server
- `npm run build` – Build for production
- `npm run test` – Run tests (if available)

## License

This project is for educational and demonstration purposes. Please contact the author for licensing details.

---

*Made with ❤️ for the Hachalu Hundessa Campus community.* 