import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBooking } from "../../../services/apiBookings";

export function useBooking() {
  const { id: bookingId } = useParams();
  const {
    data: booking,
    isPending,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isPending, error };
}
