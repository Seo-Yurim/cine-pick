import { DatePickerType } from "@/app/movies/components/movies-header.component";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { ButtonComponent } from "../button/button.component";
import "./date-picker.component.scss";

interface DatePickerProps {
  onSelectedDate: React.Dispatch<React.SetStateAction<DatePickerType>>;
}

const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

export default function DatePickerComponent({ onSelectedDate }: DatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showMonthList, setShowMonthList] = useState(false);
  const [showYearList, setShowYearList] = useState(false);

  return (
    <DatePicker
      showIcon
      portalId="root-portal"
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        onSelectedDate({ start, end });
      }}
      placeholderText="날짜 범위 선택"
      dateFormat="yyyy-MM-dd"
      isClearable
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="relative flex items-center justify-between text-nowrap rounded-t-lg bg-blue-600 px-4 py-2 text-white">
          <ButtonComponent onClick={decreaseMonth} isDisabled={prevMonthButtonDisabled}>
            <MdOutlineKeyboardDoubleArrowLeft />
          </ButtonComponent>

          {/* 연도 버튼 */}
          <div className="relative flex flex-col items-center">
            <ButtonComponent className="px-2" onClick={() => setShowYearList(!showYearList)}>
              {date.getFullYear()}년
            </ButtonComponent>

            {showYearList && (
              <ul className="absolute top-full z-10 mt-1 rounded border bg-white text-black shadow">
                {years.map((year) => (
                  <li
                    key={year}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                    onClick={() => {
                      changeYear(year);
                      setShowYearList(false);
                    }}
                  >
                    {year}년
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 월 버튼 */}
          <div className="relative flex flex-col items-center">
            <ButtonComponent className="px-2" onClick={() => setShowMonthList(!showMonthList)}>
              {months[date.getMonth()]}
            </ButtonComponent>
            {showMonthList && (
              <ul className="absolute top-full z-10 mt-1 rounded border bg-white text-black shadow">
                {months.map((month, index) => (
                  <li
                    key={month}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                    onClick={() => {
                      changeMonth(index);
                      setShowMonthList(false);
                    }}
                  >
                    {month}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ButtonComponent onClick={increaseMonth} isDisabled={nextMonthButtonDisabled}>
            <MdOutlineKeyboardDoubleArrowRight />
          </ButtonComponent>
        </div>
      )}
    />
  );
}
