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
type Category={
  _id: string;
  name: string;
}
const useCredentials = () => {
  const uId = localStorage.getItem("uId");
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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
    fetchData();
  }, []);

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

  //Logout
  const logOut = () => {
    localStorage.removeItem("uId");
    setUser(null);
  };

  return { user, setUser, users, setUsers, logOut, categories, setCategories };
};

export default useCredentials;
