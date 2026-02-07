import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getBookings } from "../../../services/apiBookings";
import { PAGE_SIZE } from "../../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all" ? null : { status: filterValue };

  // Sort
  const sortByValue = searchParams.get("sortBy");
  const sortBy =
    sortByValue &&
    (() => {
      const [field, direction] = sortByValue.split("-");
      return { field, direction };
    })();

  // Pagination
  const page = Number(searchParams.get("page")) || 1;

  // Query
  const {
    data: { data: bookings, count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
    retryOnMount: true,
  });

  // Prefetching
  const pageCount = count / PAGE_SIZE;
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
      retryOnMount: true,
    });
  }

  // Not always needed but for ref
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
      retryOnMount: true,
    });
  }

  return { bookings, count, isPending, error };
}
