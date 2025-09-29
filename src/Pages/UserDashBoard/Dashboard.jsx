import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./Admindashboard/AdminDashboard";


export default function Dashboard() {
  const { user } = useContext(AuthContext);

  console.log(user.role)
  if (!user) return <p>Please log in</p>;

  return user.role === "admin" ? (
    
    <AdminDashboard admin={user} />
  ) : (
     <UserDashboard user={user} />
  );
  
}
