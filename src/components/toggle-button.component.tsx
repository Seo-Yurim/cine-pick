"use client";

import { ReactNode, act } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";

type ToggleMenu = {
  label: string | ReactNode;
  value: string;
};

interface ToggleButtonProps {
  toggleMenus: ToggleMenu[];
  activeTab: string;
  onChange: (value: string) => void;
}

export function ToggleButtonComponent({ toggleMenus, activeTab, onChange }: ToggleButtonProps) {
  return (
    <ToggleButtonGroup className="flex items-center" selectionMode="single">
      {toggleMenus.map((menu) => (
        <ToggleButton
          className={`${activeTab === menu.value && "bg-point-color"} border px-4 py-2 font-medium selection:bg-point-color first:rounded-l-2xl last:rounded-r-2xl hover:bg-point-color`}
          key={menu.value}
          isSelected={activeTab === menu.value}
          onPress={() => onChange(menu.value)}
        >
          {menu.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
