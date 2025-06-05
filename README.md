# Phonebook Application

A modern phonebook application built with React and Redux Toolkit, featuring a clean UI and full CRUD operations for managing contacts.

## Features

- Add new contacts with name and phone number
- Delete existing contacts
- Search contacts by name
- Real-time filtering
- Loading states and error handling
- Responsive design
- Form validation
- Backend integration with mockapi.io

## Technologies Used

- React
- Redux Toolkit
- Axios
- Formik & Yup
- CSS Modules
- React Icons

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/goit-react-hw-07.git
```

2. Navigate to the project directory:
```bash
cd goit-react-hw-07
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Contact/
│   ├── ContactForm/
│   ├── ContactList/
│   └── SearchBox/
├── redux/
│   ├── contactsOps.js
│   ├── contactsSlice.js
│   ├── filtersSlice.js
│   └── store.js
└── App.jsx
```

## API Integration

The application uses mockapi.io for the backend. The API endpoint is configured in `src/redux/contactsOps.js`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The application is deployed on Vercel. You can access it at: [Your Vercel Deployment URL]

## License

This project is licensed under the MIT License.
