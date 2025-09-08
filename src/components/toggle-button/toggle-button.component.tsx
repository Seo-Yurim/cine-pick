import { ReactNode } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import "./toggle-button.component.scss";

type ToggleMenu = {
  label: string | ReactNode;
  value: string;
};

interface ToggleButtonProps {
  toggleMenus: ToggleMenu[];
  activeTab: string;
  onChange: (value: string) => void;
}

export default function ToggleButtonComponent({
  toggleMenus,
  activeTab,
  onChange,
}: ToggleButtonProps) {
  return (
    <ToggleButtonGroup selectionMode="single">
      {toggleMenus.map((menu) => (
        <ToggleButton
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
