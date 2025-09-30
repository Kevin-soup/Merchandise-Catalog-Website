import { Link } from "react-router-dom";

/**
 * Navigation bar with links to all main pages.
 *
 * @returns Navigation links to Home, Catalog, and Admin.
 */
function Navigation() {
  return (
    <nav className="main-nav">
        <Link to="/">HOME PAGE</Link>
        <Link to="/catalog">CATALOG</Link>
        <Link to="/admin">ADMIN</Link>
    </nav>
  );
}

export default Navigation;