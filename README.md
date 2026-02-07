# The Wild Oasis

A full-stack web application for a fictional online rental cabin chain, The Wild Oasis. The application is built using React, React Router, React Query, and Styled Components on the frontend, and Supabase on the backend and is meant for use by the internal staff of The Wild Oasis.

## Features

- User authentication and authorization
- Displays a dashboard with various statistics and charts
- User can create, edit, and delete cabins
- User can checkout, check-in and cancel bookings
- Bookings are paginated and can be sorted by different criteria
- Users can edit their own profile information
- Users can edit global app settings
- Can easily check sales, occupency rate, avg stay for last 7, 30, 90, etc days
- Can checkin/out guest on that day
- Calculate extras, totalPrice automatically when guest check out
- User can cancel bookings
- User can view and edit the information of the cabins they manage
- User can view and edit the information of the bookings associated with the cabins they manage

## Installation

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Create a new Supabase project and update the `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables in the `vite.config.js` file
4. Start the development server by running `npm run dev`
5. Open the application in your web browser at `http://localhost:5173`

## Deployment

1. Build the application by running `npm run build`
2. Deploy the application to a hosting service such as Vercel or Netlify

## Technologies Used

- Frontend: React, React Router, React Query, Reachart, React Hook Forms, React Toasts, Styled Components, etc
- Backend: Supabase
- Database: PostgreSQL

## Authors

- [epochnt] - Everday Normie Dev

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
