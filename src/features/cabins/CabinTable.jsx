import { useCabins } from "./hooks";
import { useSearchParams } from "react-router";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // Filter
  const filter = searchParams.get("discount") || "all";
  let filteredCabin = cabins;

  if (filter === "with-discount") {
    filteredCabin = filteredCabin.filter((cabin) => cabin.discount);
  } else if (filter === "no-discount")
    filteredCabin = filteredCabin.filter((cabin) => !cabin.discount);

  //Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
