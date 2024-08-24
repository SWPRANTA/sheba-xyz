import { Link, NavLink } from "react-router-dom";
import logo from "../../public/images/sheba-xyz-logo.svg";
import ctl from "@netlify/classnames-template-literals";
import useAuth from "../hooks/useAuth";
const navBarSuperStyle = ctl(`bg-white 
h-20 md:h-16 
sticky 
top-0 
shadow-md 
z-10`);
const navBarSubStyle = ctl(`container 
    mx-auto 
    flex 
    justify-between 
    items-center 
    p-2`);
const getNavLinkClass = (
  isActive: boolean,
  isPending: boolean,
  isTransitioning: boolean
): string => {
  return [
    isPending ? "" : "",
    isActive
      ? "px-3 py-1 mx-2 text-white border border-sky-800 bg-sky-800 rounded-md"
      : "px-3 py-1 mx-2 text-black border rounded-md hover:bg-sky-800 hover:text-white",
    isTransitioning ? "transitioning" : "",
  ].join(" ");
};

export default function Navbar() {
  const { user } = useAuth();
  return (
    <div className={navBarSuperStyle}>
      <div className={navBarSubStyle}>
        <Link to={"/"}>
          <img src={logo} alt="Sehba.xyz logo"></img>
        </Link>
        <div className="">
          <NavLink
            to={"/services"}
            className={({ isActive, isPending, isTransitioning }) =>
              getNavLinkClass(isActive, isPending, isTransitioning)
            }
          >
            Services
          </NavLink>
          <NavLink
            to={"/staffs"}
            className={({ isActive, isPending, isTransitioning }) =>
              getNavLinkClass(isActive, isPending, isTransitioning)
            }
          >
            Staffs
          </NavLink>

          {user ? (
            <>
              {user.role === "user" && (
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive, isPending, isTransitioning }) =>
                    getNavLinkClass(isActive, isPending, isTransitioning)
                  }
                >
                  Dashboard
                </NavLink>
              )}
              {user.role === "admin" && (
                <NavLink
                  to={"/admin-dashboard"}
                  className={({ isActive, isPending, isTransitioning }) =>
                    getNavLinkClass(isActive, isPending, isTransitioning)
                  }
                >
                  Admin
                </NavLink>
              )}
              {user.role === "staff" && (
                <NavLink
                  to={"/staff-dashboard"}
                  className={({ isActive, isPending, isTransitioning }) =>
                    getNavLinkClass(isActive, isPending, isTransitioning)
                  }
                >
                  Staff
                </NavLink>
              )}
            </>
          ) : (
            <NavLink
              to={"/login"}
              className={({ isActive, isPending, isTransitioning }) =>
                getNavLinkClass(isActive, isPending, isTransitioning)
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
