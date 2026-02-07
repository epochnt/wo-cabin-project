import { useSearchParams } from "react-router";
import Select from "./Select";

export default function Sortby({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByDefault = searchParams.get("sortBy") || options.at(0).value;

  const handleOnChange = (e) => {
    setSearchParams((searchParams) => {
      searchParams.set("sortBy", e.target.value);
      return searchParams;
    });
  };

  return (
    <Select
      value={sortByDefault}
      options={options}
      onChange={handleOnChange}
      type="white"
    />
  );
}
