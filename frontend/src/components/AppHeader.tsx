import { useNavigate } from "react-router-dom";
import logo from "../assets/greengaflLogo.png";
import { logout } from "../services/auth";

type Props = {
  showLogout?: boolean;
};

export function AppHeader({ showLogout = true }: Props) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/", { replace: true });
    }
  }

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
        <button
          type="button"
          className="app-header-logout-button"
          onClick={handleLogout}
        >
          Log out
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  );
}
