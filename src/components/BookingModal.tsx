import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const formattedHours = Number(hours) % 12 || 12;
  const formattedMinutes = minutes;
  const period = Number(hours) < 12 ? "AM" : "PM";
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export default function BookingModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { slots, user, bookedService, bookedStaff, bookedSlot, setBookedSlot } =
    useAuth();
  const [bookingError, setBookingError] = useState<string | null>("");
  const navigate = useNavigate();

  const bookNow = async () => {
    if (user?.email && user?.role === "user") {
      if (bookedSlot?.label) {
        const btn = document.getElementById(
          "pay-now"
        ) as HTMLButtonElement | null;
        if (btn) {
          btn.innerText = "Processing Payment...";
          btn.disabled = true;
        }
        const trxID = await generateTransactionId();
        const formData = {
          date: new Date().toISOString().split("T")[0],
          email: user.email,
          name: user.name,
          bookedService,
          bookedStaff,
          bookedSlot,
          trxID,
          status: "pending",
        };
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:3001/booking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (result.status) {
              if (bookedStaff?.rate) {
                payNow(bookedStaff.rate, trxID);
              }

            } else {
              setBookingError(result.message);
              if (btn) {
                btn.innerText = "Pay Now";
                btn.disabled = false;
              }
              console.log("problem", result.message);
            }
          } catch (error) {
            console.log("Error during booking:", error);
          }
        };
        fetchData();
      }
    } else {
      navigate("/login");
    }
  };

  async function generateTransactionId(prefix: string = "TX") {
    const timeStamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const transactionId = `${prefix}-${timeStamp}-${randomNumber}`;
    return transactionId;
  }

  const payNow = (amount: string, trxID: string) => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/pay/${amount}/${trxID}`
        );
        const result = await response.json();
        if (result.status) {
          window.location.replace(result.paymentLink);
        }
        else{
          console.log(result);
          
        }
      } catch (err) {
        console.log(err);
        fetchData();
      }
    };
    fetchData();
  };
  return (
    <div
      className={`fixed inset-0 z-10 items-center justify-center overflow-x-hidden overflow-y-auto transition-opacity duration-300 ease-in-out
        ${isOpen ? "flex" : "hidden"}`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black opacity-50"
      ></div>
      <div className="relative bg-white rounded-lg w-96">
        {children}
        <div className="p-4 md:p-5">
          <p className="text-gray-500">Select your desired slot:</p>
          <p className="text-rose-400 text-sm">{bookingError}</p>
          <ul className="space-y-4 max-h-80 overflow-y-auto px-2">
            {slots.length > 0 &&
              slots.map((slot) => (
                <li key={slot._id}>
                  <input
                    onChangeCapture={() => {
                      setBookingError(null);
                      setBookedSlot(slot);
                    }}
                    type="radio"
                    id={`slot-${slot._id}`}
                    name="slot"
                    value={`${slot.label}`}
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor={`slot-${slot._id}`}
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 border rounded-md cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600  hover:text-gray-700 hover:bg-gray-100"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        {slot.label}
                      </div>
                      <div className="w-full text-gray-500">
                        {formatTime(slot.start_time)} -{" "}
                        {formatTime(slot.end_time)}
                      </div>
                    </div>
                    <img
                      src="../../public/images/icons/right-arrow-svgrepo-com.svg"
                      alt="right-arrow"
                      className="w-5"
                    />
                  </label>
                </li>
              ))}
          </ul>
          <button
            onClick={bookNow}
            id="pay-now"
            className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 p-2 m-2 rounded-lg font-medium text-sm text-center"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
