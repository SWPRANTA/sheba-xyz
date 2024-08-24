import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthProvider from "./context/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
