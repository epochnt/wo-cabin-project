import styled from "styled-components";
import { useRecentBookings, useRecentStays } from "./hooks";
import { useCabins } from "../cabins/hooks";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import Spinner from "../../ui/Spinner";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
export default function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { stays, isLoading: isStaysLoading, numDays } = useRecentStays();
  const { cabins, isPending: isCabinLoading } = useCabins();

  if (isLoading || isStaysLoading || isCabinLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats {...{ bookings, stays, numDays, numCabins: cabins.length }} />
      <TodayActivity />
      <DurationChart {...{ stays }} />
      <SalesChart {...{ bookings, numDays }} />
    </StyledDashboardLayout>
  );
}
