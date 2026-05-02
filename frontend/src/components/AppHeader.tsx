import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/greengaflLogo.png";
import { getAuthStatus, logout } from "../services/auth";

type Props = {
  showLogout?: boolean;
};

export function AppHeader({ showLogout = true }: Props) {
  const [status, setStatus] = useState<any>(null);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    let active = true;
    getAuthStatus()
      .then((data) => {
        if (active) setStatus(data);
      })
      .catch(() => {
        if (active) setStatus(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <header className="app-header">
      <button
        type="button"
        className="app-header-logo-button"
        onClick={() => navigate("/you")}
        aria-label="Go to your page"
      >
        <img src={logo} alt="Greengafl logo" className="app-header-logo" />
      </button>

      {showLogout ? (
        <>
          {status?.authenticated && (
            <p className="app-header-greeting">Hello, {status?.username}</p>
          )}
          <button
            type="button"
            className="app-header-logout-button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </>
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  );
}
