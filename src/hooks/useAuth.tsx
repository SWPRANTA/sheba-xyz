import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("AuthContext was used outside the AuthProvider");
    }
    return context;
}
export default useAuth;