import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sortby from "../../ui/Sortby";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No Discount", value: "no-discount" },
          { label: "With Discount", value: "with-discount" },
        ]}
      />
      <Sortby
        options={[
          { value: "name-asc", label: "Sort By Name ↑" },
          { value: "name-desc", label: "Sort By Name ↓" },
          { value: "regularPrice-asc", label: "Sort By Price ↑" },
          { value: "regularPrice-desc", label: "Sort By Price ↓" },
          { value: "maxCapacity-asc", label: "Sort By Capacity ↑" },
          { value: "maxCapacity-desc", label: "Sort By Capacity ↓" },
        ]}
      />
    </TableOperations>
  );
}
