import { ReactNode } from "react";
import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";
import { CollectionList } from "@/types/collections.type";
import { ButtonComponent } from "./button/button.component";

interface MenuProps {
  menuList: CollectionList[];
  btnIcon?: ReactNode;
  btnText?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelectCollection?: (collection: CollectionList) => void;
}

export function MenuComponent({
  menuList,
  btnIcon,
  btnText,
  onSelectCollection,
  ...props
}: MenuProps) {
  return (
    <MenuTrigger {...props}>
      <ButtonComponent className="rounded-full border p-2 focus:outline-none">
        {btnIcon} {btnText}
      </ButtonComponent>
      <Popover>
        <Menu className="rounded-xl border bg-black p-2">
          {menuList.map((menu) => (
            <MenuItem
              key={menu.id}
              className="cursor-pointer hover:bg-white/20"
              onClick={() => onSelectCollection?.(menu)}
            >
              {menu.title}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
