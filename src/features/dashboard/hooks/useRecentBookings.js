import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;
  const querDays = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isPending: isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(querDays),
  });

  return { bookings, isLoading };
}
