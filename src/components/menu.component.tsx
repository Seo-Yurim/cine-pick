import { ReactNode } from "react";
import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";
import { MovieCollectionItem } from "@/types/movie.type";
import { ButtonComponent } from "./button/button.component";

interface MenuProps {
  menuList: MovieCollectionItem[];
  btnIcon?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelectCollection?: (collection: MovieCollectionItem) => void;
}

export function MenuComponent({ menuList, btnIcon, onSelectCollection, ...props }: MenuProps) {
  return (
    <MenuTrigger {...props}>
      <ButtonComponent className="rounded-full border p-2 focus:outline-none">
        {btnIcon}
      </ButtonComponent>
      <Popover>
        <Menu className="rounded-xl border bg-black p-2">
          {menuList.map((menu) => (
            <MenuItem
              key={menu.id}
              className="cursor-pointer hover:bg-white/20"
              onClick={() => onSelectCollection?.(menu)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
