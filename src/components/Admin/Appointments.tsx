import useAuth from "../../hooks/useAuth";

type Slote = {
  _id: string;
  staffId: string;
  label: string;
  start_time: string;
  end_time: string;
};
type Service = {
  _id: string;
  name: string;
  category: string;
  details: string;
  image: string;
  attribute: string;
  attributeTitle: string;
};
type Staff = {
  _id: string;
  name: string;
  bio: string;
  description: string;
  location: string;
  rate: string;
  category: string;
  services: string[];
  image: string;
};
type Booking = {
  _id: string;
  date: string;
  email: string;
  name: string;
  slotId: string;
  bookedService: Service;
  bookedStaff: Staff;
  bookedSlot: Slote;
  trxID: string;
  status: string;
};
const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const formattedHours = Number(hours) % 12 || 12;
    const formattedMinutes = minutes;
    const period = Number(hours) < 12 ? "AM" : "PM";
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };
export default function Appointments() {
  const { bookings } = useAuth();
  return (
    <div className="overflow-auto my-5 max-h-80 p-2">
      <table className="min-w-full border relative">
        <thead className="bg-white border-b sticky -top-3">
          <tr>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              #
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Date
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Name
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Email
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Service
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Slot
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Time
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Staff
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.length > 0 &&
            bookings.map((booking: Booking, index) => (
              <tr
                key={booking._id}
                className="odd:bg-gray-100 even:bg-gray-300 border-b "
              >
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {booking.date}
                </td>
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {booking.name}
                </td>
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {booking.email}
                </td>
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {booking.bookedService.name}
                </td>
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {booking.bookedSlot.label}
                </td>
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {formatTime(booking.bookedSlot.start_time)} -{" "}
                  {formatTime(booking.bookedSlot.end_time)}
                </td>
                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">
                  {booking.bookedStaff.name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
