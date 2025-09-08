import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import "./toggle-button.component.scss";

export default function ToggleButtonComponent() {
  return (
    <ToggleButtonGroup>
      <ToggleButton>전체</ToggleButton>
      <ToggleButton>로맨스</ToggleButton>
      <ToggleButton>코미디</ToggleButton>
      <ToggleButton>액션</ToggleButton>
      <ToggleButton>스릴러</ToggleButton>
      <ToggleButton>공포</ToggleButton>
    </ToggleButtonGroup>
  );
}
