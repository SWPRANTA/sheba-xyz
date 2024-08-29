import { createContext } from "react";
import useCredentials from "../hooks/useCredentials";
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
type Users = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
type Category = {
  _id: string;
  name: string;
};
type Slote = {
  _id: string;
  staffId: string;
  label: string;
  start_time: string;
  end_time: string;
};
type Service = {
  _id: string,
  name: string,
  category: string,
  details: string,
  image: string,
  attribute: string,
  attributeTitle: string
};
type Staff = {
  _id: string;
  name: string;
  bio: string;
  description: string;
  location: string;
  rate: string;
  category: string,
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
type AuthContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: Users[];
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
  slots: Slote[];
  setSlots: React.Dispatch<React.SetStateAction<Slote[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  staffs: Staff[];
  setStaffs: React.Dispatch<React.SetStateAction<Staff[]>>;
  bookedService: Service | null;
  setBookedService: React.Dispatch<React.SetStateAction<Service | null>>;
  bookedStaff: Staff | null;
  setBookedStaff: React.Dispatch<React.SetStateAction<Staff | null>>;
  bookedSlot: Slote | null;
  setBookedSlot: React.Dispatch<React.SetStateAction<Slote | null>>;
  userBookings: Booking[];
  bookings: Booking[];
  staffPayments: Booking[];
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const allContext = useCredentials();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
