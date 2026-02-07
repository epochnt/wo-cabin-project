import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;
  const querDays = subDays(new Date(), numDays).toISOString();

  const { data: stays, isPending: isLoading } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(querDays),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { stays: confirmedStays, numDays, isLoading };
}
