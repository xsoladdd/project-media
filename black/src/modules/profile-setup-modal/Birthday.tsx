import React, { SetStateAction, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
interface BirthdayProps {
  birthday: Date;
  setBirthday: React.Dispatch<SetStateAction<Date>>;
}

const Birthday: React.FC<BirthdayProps> = ({ birthday, setBirthday }) => {
  // const [birthday, setBirthday] = useState(moment().toDate());

  // https://stackoverflow.com/questions/17987647/moment-js-transform-to-date-object
  // Convert moment to date
  // const date = moment();
  // const toDate = date.toDate();
  // const toMoment = moment(toDate);

  return (
    <div
      className="flex flex-col place-items-center"
      // className="w-full"
    >
      <p className="py-3 ">
        Birthday: {moment(birthday).format("MMMM DD YYYY")}
      </p>
      <Calendar
        minDetail="decade"
        calendarType="US"
        defaultView="decade"
        onChange={(date: Date) => setBirthday(date)}
        value={birthday}
      />
    </div>
  );
};
export default Birthday;
