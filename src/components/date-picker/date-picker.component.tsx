import { DatePickerType } from "@/app/movies/components/movies-header.component";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import { FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./date-picker.component.scss";

export function DatePickerComponent({
  onSelectedDate,
  ...props
}: {
  onSelectedDate: React.Dispatch<React.SetStateAction<DatePickerType>>;
}) {
  const handleChange = (range: DatePickerType | null) => {
    if (range) {
      onSelectedDate({ start: range.start, end: range.end });
    } else {
      onSelectedDate({ start: null, end: null });
    }
  };

  return (
    <DateRangePicker aria-label="날짜 선택" onChange={handleChange} {...props}>
      <Group>
        <DateInput aria-label="시작 날짜" slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput aria-label="종료 날짜" slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button>
          <FaArrowAltCircleDown className="h-6 w-6" />
        </Button>
      </Group>
      <Popover>
        <Dialog>
          <RangeCalendar className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Button slot="previous">
                <FaArrowAltCircleLeft />
              </Button>
              <Heading />
              <Button slot="next">
                <FaArrowAltCircleRight />
              </Button>
            </div>
            <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}
