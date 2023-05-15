import { useEffect, useState } from "react";
import TrainingClass from "../components/TrainingClass";
import MenuBar from "../components/MenuBar";

const BookingClasses = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [bookings, setBookings] = useState([]);

  const getBookingClasses = () => {
    try {
      fetch(`http://localhost:8080/api/class/booked/future`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "get",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          console.log(response);
        })
        .then((data) => {
          console.log(data);
          setBookings(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBookingClasses();
  }, []);
  return (
    <div className="parent">
      <MenuBar></MenuBar>
      <div className="child">
        {bookings !== [] &&
          bookings.map((booking) => {
            return <TrainingClass key={booking.id} parentToChild={booking} />;
          })}
      </div>
    </div>
  );
};
export default BookingClasses;
