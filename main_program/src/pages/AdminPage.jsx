import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

/**
 *  Admin Page for this application.
 *  Handles business owner authorization.
 * 
 *  @returns Log in form with navigation to admin dashboard.
 */
function AdminPage() {
    const [password, setPassword] = useState("");            // Tracks password input.
    const [error, setError] = useState("");                  // Tracks login error.
    const navigate = useNavigate();

    // Handle form submission to verify password with auth microservice.
    const handleLogin = async (e) => {
        e.preventDefault();

        // Connect to auth microservice.
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        // Incorrect password. Store error message. 
        if (response.status !== 200) {
            setError("Invalid Password.");
            return;
        }

        // Correct password. Save token and redirect to dashboard. 
        const { token } = await response.json();
        localStorage.setItem("adminToken", token);
        navigate("/admin-dashboard");
    };

   return (
        <div className="admin-login-container">
            <div>
                {/* AdminPage header */}
                <header className="page-header">
                    <h1>Admin</h1>
                    <p>Log in to edit catalog. BUSINESS OWNER ONLY!</p>
                </header>

                {/* Navigation links. */}
                <Navigation/>

                {/* Log in form */}
                <form onSubmit={handleLogin} className="admin-login-form">
                    <input
                        type="text"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Log In</button>
                </form>

                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default AdminPage;
