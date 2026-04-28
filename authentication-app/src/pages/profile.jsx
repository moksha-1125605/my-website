import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Profile</h2>

        {user ? (
          <div style={styles.info}>
            <p><span style={styles.label}>Name:</span> {user.name}</p>
            <p><span style={styles.label}>Email:</span> {user.email}</p>
            <p>
              <span style={styles.label}>Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p style={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },

  title: {
    marginBottom: "20px"
  },

  info: {
    textAlign: "left"
  },

  label: {
    fontWeight: "bold",
    color: "#555"
  },

  loading: {
    color: "#888"
  }
};

export default Profile;