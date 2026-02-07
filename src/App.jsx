import { RouterProvider, Navigate, createBrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";
import {
  Account,
  Booking,
  Bookings,
  Cabins,
  CheckIn,
  Dashboard,
  Login,
  PageNotFound,
  Settings,
  Users,
} from "./pages";
import AppLayout from "./ui/AppLayout";
import ProtectedLayout from "./ui/ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <PageNotFound />,
    children: [
      {
        element: (
          <ProtectedLayout>
            <AppLayout />
          </ProtectedLayout>
        ),
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> },
          { path: "/account", element: <Account /> },
          { path: "/bookings", element: <Bookings /> },
          { path: "/bookings/:id", element: <Booking /> },
          { path: "/checkin/:id", element: <CheckIn /> },
          { path: "/cabins", element: <Cabins /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/settings", element: <Settings /> },
          { path: "/users", element: <Users /> },
        ],
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
    },
  },
});

const toastOptions = {
  success: { duration: 3000 },
  error: { duration: 5000 },
  style: {
    fontSize: "1.6rem",
    maxWidth: "50rem",
    padding: "1.6rem 2.5rem",
    backgroundColor: "var(--color-grey-0)",
    color: "var(--color-grey-770)",
  },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "0.8rem" }}
        toastOptions={toastOptions}
      />
    </QueryClientProvider>
  );
}
