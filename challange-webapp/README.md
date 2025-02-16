# Challenge Tracker

Challenge Tracker is a React application that allows users to create, manage, and track challenges with different statuses. Users can add challenges, mark them as completed or failed, and view challenge details.

## Features

- Add new challenges with a title and description.
- Track challenge statuses: Active, Completed, and Failed.
- Update challenge statuses dynamically.
- View challenge details with animated UI interactions.
- Uses React Context API for state management.
- Animated UI using Framer Motion.
- Routing with React Router.

## Tech Stack

- React.js (with TypeScript)
- React Router
- Context API
- Framer Motion
- CSS Modules

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/challenge-tracker.git
   ```
2. Navigate to the project directory:
   ```sh
   cd challenge-tracker
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```
challenge-tracker/
│── src/
│   ├── assets/            # Static assets (images, etc.)
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application pages
│   ├── store/             # Context API store
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point
│── public/                # Static files
│── index.css              # Global styles
│── package.json           # Project metadata
```

## Usage

### Adding a New Challenge

- Go to the Challenges page and enter a title and description to create a new challenge.

### Updating Challenge Status

- Use the provided buttons to mark a challenge as **Completed** or **Failed**.

### Viewing Challenge Details

- Click on "View Details" to expand and see more information about a challenge.

## Deployment

To deploy the application:

```sh
npm run build
```

This generates the production build inside the `dist/` folder. You can host it on platforms like Vercel, Netlify, or Firebase Hosting.

## Author

Developed by **Gerry Desrian**.
