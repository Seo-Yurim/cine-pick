import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectProps,
  SelectValue,
} from "react-aria-components";
import { BiChevronDown } from "react-icons/bi";
import "./select.component.scss";

interface SelectComponentProps extends SelectProps {
  value: { label: string; value: string };
  options: { label: string; value: string }[];
  onSelect: (option: { label: string; value: string }) => void;
}

export function SelectComponent({ value, options, onSelect, ...props }: SelectComponentProps) {
  return (
    <Select
      selectedKey={value.value}
      onSelectionChange={(key) => {
        const selected = options.find((opt) => opt.value === key);
        if (selected) onSelect(selected);
      }}
      aria-label="메뉴 리스트"
      {...props}
    >
      <Button>
        <SelectValue />
        <span aria-hidden="true">
          <BiChevronDown size={24} />
        </span>
      </Button>
      <Popover>
        <ListBox>
          {options.map((option) => (
            <ListBoxItem id={option.value} key={option.value} onClick={() => onSelect(option)}>
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
