import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import "./toggle-button.component.scss";

export default function ToggleButtonComponent({ toggleMenus = [] }: { toggleMenus: string[] }) {
  return (
    <ToggleButtonGroup>
      {toggleMenus.map((menu, idx) => (
        <ToggleButton key={idx}>{menu}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
