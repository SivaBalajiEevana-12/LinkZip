import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../stores/store";
import { getMe, logoutUser } from "../stores/authSlice";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Link2 className="h-5 w-5" />
          LinkZip
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary"
            >
              Dashboard
            </Link>

            <span className="text-sm text-muted-foreground">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium hover:text-primary"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Get Started
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}