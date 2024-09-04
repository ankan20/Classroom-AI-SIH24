import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
    username: string;
    role: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUser(null); // Clear user state
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>

        {user ? (
          <>
            {/* Render items based on the user's role */}
            {user.role === "student" && (
              <Link href="/student">
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Dashboard"
                ></MenuItem>
              </Link>
            )}
            {user.role === "teacher" && (
              <Link href="/teacher">
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Dashboard"
                ></MenuItem>
              </Link>
            )}
            {user.role === "teacher" && (
              <Link href="/teacher/add-student">
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Add Student"
                ></MenuItem>
              </Link>
            )}
            {user.role === "admin" && (
              <Link href="/admin">
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Dashboard"
                ></MenuItem>
              </Link>
            )}

            {user.role === "admin" && (
              <Link href="/admin/add-teacher" passHref>
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Add Teacher"
                />
              </Link>
            )}

            {/* Logout option */}
            <div onClick={handleLogout} className="cursor-pointer">Logout</div>
          </>
        ) : (
          // Show login option if no user is logged in
          <Link href="/login">
            <MenuItem
              setActive={setActive}
              active={active}
              item="Login"
            ></MenuItem>
          </Link>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;
