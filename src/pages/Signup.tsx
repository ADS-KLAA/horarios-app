import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";

const Signup: React.FC = () => {
  
  const navigate = useNavigate();
  const {register} = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    register(name,email,password,"professor");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(242, 243, 245, var(--tw-bg-opacity, 1))",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <img
          src="src/assets/iscteLogo.png"
          alt="ISCTE logo"
          style={{ marginBottom: "24px" }}
        />
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "rgba(242, 243, 245, var(--tw-bg-opacity, 1))",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "rgba(242, 243, 245, var(--tw-bg-opacity, 1))",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "rgba(242, 243, 245, var(--tw-bg-opacity, 1))",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "rgba(29, 29, 29, var(--tw-bg-opacity, 1))",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom:"14px"
            }}
          >
            Registar
          </button>
        </form>
        <span className="w-full flex gap-2 justify-end text-right text-gray-800">
          Already have an account? <Link className="underline underline-offset-2 hover:text-blue-700" to={"/login"}>Login Here</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;