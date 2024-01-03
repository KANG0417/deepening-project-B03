import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TWritingProps } from "../../types/letter";

const Calendar = ({ setSelectedDate }: TWritingProps) => {
  const [selectedDate, setSelectedDateLocal] = useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDateLocal(date);
    if (setSelectedDate !== null && setSelectedDate !== undefined) {
      setSelectedDate(date); // 부모 컴포넌트로 선택된 날짜 전달
    }
  };

  return (
    <DatePicker
      dateFormat="yyyy.MM.dd"
      shouldCloseOnSelect
      minDate={new Date("2024-01-01")}
      maxDate={new Date("2024-12-31")}
      selected={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default Calendar;
