# User Management Application

A simple and functional React application for managing user data, built as an internship project demonstration.

## Overview

This application demonstrates core React concepts including component management, state handling, routing, form validation, and API integration. The app fetches user data from the JSONPlaceholder API and provides functionality to view, search, sort, and add users with a clean, responsive interface.

## Features

- **User Listing**: Displays users fetched from JSONPlaceholder API with name, email, and company information
- **Real-time Search**: Filter users by name or email with instant results
- **User Details**: Click on any user to view complete information including address, phone, and website
- **Add New Users**: Form to add new users with name, email, and phone validation
- **Update Users**: Edit user information directly from the user detail page
- **Delete Users**: Remove users with confirmation dialog
- **Sorting**: Sort users by name or email in ascending/descending order
- **Responsive Design**: Clean, mobile-friendly interface using custom CSS
- **Local Persistence**: Added users are stored in localStorage and persist between sessions
- **Redux State Management**: Centralized state management for all user operations

## Technology Stack

- **React 19.1.1**: Modern React with hooks for component logic
- **Redux Toolkit**: State management for users, search, and sorting
- **React Redux**: React bindings for Redux state management
- **React Router DOM 7.9.3**: Client-side routing for navigation
- **Fetch API**: For HTTP requests to JSONPlaceholder API
- **Custom CSS**: Clean, responsive styling without external frameworks
- **localStorage**: For persisting locally added users

## Project Structure

```
src/
├── store/              # Redux store configuration
│   ├── index.js        # Store setup and configuration
│   └── userSlice.js    # User state management slice
├── components/         # Reusable UI components
│   ├── AddUserForm.js  # User creation form component
│   └── index.js        # Component exports
├── pages/              # Main application pages
│   ├── HomePage.js     # User listing and management page
│   ├── UserDetailPage.js # User details and editing page
│   └── index.js        # Page exports
├── utils/              # Utility functions and constants
│   ├── constants.js    # Application constants
│   ├── localStorage.js # Local storage utilities
│   ├── userUtils.js    # User-related utility functions
│   └── index.js        # Utility exports
├── assets/             # Static assets
│   ├── index.css       # Global styles
│   └── logo.svg        # Application logo
├── App.js              # Main routing and layout with Redux Provider
├── index.js            # Application entry point
├── App.test.js         # Application tests
├── reportWebVitals.js  # Performance monitoring
└── setupTests.js       # Test configuration
```

## Architecture

### Component Organization

- **Pages**: Main application screens (HomePage, UserDetailPage)
- **Components**: Reusable UI components (AddUserForm)
- **Utils**: Pure utility functions and constants
- **Store**: Redux state management configuration

### Code Organization Principles

- **Separation of Concerns**: Each folder has a specific responsibility
- **Clean Imports**: Index files provide clean import paths
- **Reusability**: Components and hooks are designed for reuse
- **Maintainability**: Clear structure makes code easy to maintain and extend

## Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/linkplus-user-management.git
   cd client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## How It Works

### Data Management

- **API Users**: Fetched from JSONPlaceholder API on application load
- **Local Users**: Added through the form and stored in localStorage
- **Combined View**: Both API and local users are displayed together

### User Operations

- **Viewing**: Click any user card to see detailed information
- **Searching**: Type in the search bar to filter users by name or email
- **Sorting**: Use sort buttons to organize users alphabetically
- **Adding**: Fill out the form to add new users (name and email required)
- **Updating**: Click "Edit User" on the detail page to modify user information
- **Deleting**: Click "Delete User" to remove users with confirmation

### Data Persistence

- API users are fetched fresh on each page load
- Locally added users persist in localStorage
- User details page handles both API and local users appropriately

## API Integration

The application integrates with the JSONPlaceholder API for user data:

**Endpoint**: `https://jsonplaceholder.typicode.com/users`

**User Object Structure**:

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner (includes basic unit tests)

### Code Quality

The project follows React best practices:

- Functional components with hooks
- Proper state management with Redux
- Clean component separation
- Responsive design principles
- Error handling and loading states
- Professional code formatting and structure

## Browser Support

This application works in all modern browsers that support:

- ES6+ JavaScript features
- CSS Grid and Flexbox
- Fetch API
- localStorage

## Submission

**Submission Date**: October 01, 2025

Please send completion email to `office@linkplus-it.com` with the repository link.

## License

This project is created for educational and demonstration purposes.
