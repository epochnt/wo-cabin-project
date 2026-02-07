import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings, stays, numDays, numCabins }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = stays.length;

  // num checked in nights stays / all avail nights -> num days * cabin count
  const occupancyRate =
    stays.reduce((nightCount, stay) => nightCount + stay.numNights, 0) /
    (numDays * numCabins);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}
