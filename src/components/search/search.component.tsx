import { Input, SearchField, Text } from "react-aria-components";
import { BsSearch } from "react-icons/bs";
import "./search.component.scss";

interface SearchProps {
  placeholder?: string;
}

export default function SearchComponent({ placeholder, ...props }: SearchProps) {
  return (
    <SearchField {...props}>
      <BsSearch className="h-6 w-6 text-background" />
      <Input placeholder={placeholder} />
      <Text slot="description" />
    </SearchField>
  );
}
