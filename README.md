# Cheesehacks 2026 Website

This is the official website for Cheesehacks 2026, the premier hackathon at UW-Madison.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies:**
   Open your terminal in the project directory and run:
   ```bash
   npm install
   ```

2. **Start the development server:**
   Run the following command to start the local server:
   ```bash
   npm run dev
   ```

3. **View the website:**
   Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📁 Project Structure

- `src/components`: Contains all the React components (Hero, About, FAQ, etc.)
- `src/App.jsx`: Main application component
- `src/index.css`: Global styles and Tailwind directives
- `tailwind.config.js`: Tailwind CSS configuration

## 🚢 Deployment

To build the project for production:

```bash
npm run build
```

This will create a `dist` folder with the optimized assets, ready to be deployed to Vercel, Netlify, or GitHub Pages.
