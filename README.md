# CFS User Directory Application

A modern user directory management application built with React, TypeScript, and Azure AD B2C authentication.

## Features

- **Azure AD B2C Authentication** - Secure login using Microsoft Authentication Library (MSAL)
- **User Management** - Create, read, update, and delete user records
- **Protected Routes** - Authentication-required pages for sensitive operations
- **Form Validation** - Client-side validation using React Hook Form and Zod
- **Responsive UI** - Modern, mobile-friendly interface built with Tailwind CSS
- **Toast Notifications** - User feedback with react-hot-toast

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: @azure/msal-react, @azure/msal-browser
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast

## User Schema

```typescript
interface User {
  id?: number
  name: string
  age: number
  city: string
  state: string
  pinCode: number
}
```

## Prerequisites

- Node.js (v16 or higher)
- Azure AD B2C tenant configured
- Backend API for user data management

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cfs.user-directory.app
```

2. Install dependencies:
```bash
npm install
```

3. Configure Azure AD B2C in `src/auth/authConfig.ts`:
```typescript
export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    redirectUri: "http://localhost:5173",
  },
};

export const loginRequest = {
  scopes: [
    "https://YOUR_TENANT.onmicrosoft.com/YOUR_API_ID/access_as_user",
  ],
};
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── auth/           # Authentication configuration
├── components/     # Reusable UI components
│   ├── ProtectedRoute.tsx
│   ├── userForm.tsx
│   └── spinner.tsx
├── pages/          # Page components
│   ├── login.tsx
│   ├── userList.tsx
│   ├── userDetails.tsx
│   └── updateUser.tsx
├── services/       # API service layer
│   └── userService.ts
├── types/          # TypeScript type definitions
│   └── user.ts
└── App.tsx         # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication Flow

1. User navigates to the application
2. If not authenticated, redirected to `/login`
3. User authenticates via Azure AD B2C
4. Access token is obtained and stored
5. Protected routes become accessible
6. API calls include Bearer token in headers
