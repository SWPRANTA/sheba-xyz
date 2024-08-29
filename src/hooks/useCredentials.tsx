import { useEffect, useState } from "react";
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
const useCredentials = () => {
  const uId = localStorage.getItem("uId");
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [slots, setSlots] = useState<Slote[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [bookedService, setBookedService] = useState<Service | null>(null);
  const [bookedStaff, setBookedStaff] = useState<Staff | null>(null);
  const [bookedSlot, setBookedSlot] = useState<Slote | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [staffPayments, setStaffPayments] = useState<Booking[]>([]);

  //Persist Login
  useEffect(() => {
    if (uId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/user/${uId}`);
          const result = await response.json();
          setUser(result.user);
        } catch (error) {
          console.log(error);
          fetchData();
        }
      };
      fetchData();
    } else {
      setUser(null);
    }
  }, [uId]);

  //Get All Users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const result = await response.json();
        if (result.status) {
          setUsers(result.users);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.role === "admin") {
      fetchData();
    }
  }, [user?.role]);

  //Get all categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        const result = await response.json();
        if (result.status) {
          setCategories(result.categories);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Get all slots
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/staff/slots");
        const result = await response.json();
        if (result.status) {
          setSlots(result.slots);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Get all services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/services");
        const result = await response.json();
        if (result.status) {
          setServices(result.services);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Get all staff services detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/staff/services");
        const result = await response.json();
        if (result.status) {
          setStaffs(result.staffDetails);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Get all bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/bookings");
        const result = await response.json();
        if (result.status) {
          setBookings(result.bookings);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(user?.role === "admin"){
      fetchData();
    }
  }, [user?.role]);
 
  //Get payments by email
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/payments/${user?.email}`
        );
        const result = await response.json();
        if (result.status) {
          setUserBookings(result.payments);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.role === "user") {
      fetchData();
    }
  }, [user?.role, user?.email]);
  
  //Get payments by email
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/payments/staff/${user?.name}`
        );
        const result = await response.json();
        if (result.status) {
          setStaffPayments(result.payments);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.role === "staff") {
      fetchData();
    }
  }, [user?.role, user?.name]);
  //Logout
  const logOut = () => {
    localStorage.removeItem("uId");
    setUser(null);
  };

  return {
    user,
    setUser,
    users,
    setUsers,
    logOut,
    categories,
    setCategories,
    slots,
    setSlots,
    services,
    setServices,
    staffs,
    setStaffs,
    bookedService,
    setBookedService,
    bookedStaff,
    setBookedStaff,
    bookedSlot,
    setBookedSlot,
    userBookings,
    bookings,
    staffPayments
  };
};

export default useCredentials;
