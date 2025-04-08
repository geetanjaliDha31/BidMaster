import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./context/AuthContext"
import { ItemsProvider } from "./context/ItemsContext"
import Navbar from "./components/layout/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ItemDetailPage from "./pages/ItemDetailPage"
import UserDashboardPage from "./pages/UserDashboardPage"
import AddItemPage from "./pages/AddItemPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="bidding-app-theme">
      <AuthProvider>
        <ItemsProvider>
          <Router>
            <div className="min-h-screen bg-background " style={{width:"99vw"}} >
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/items/:id" element={<ItemDetailPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <UserDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add-item"
                    element={
                      <ProtectedRoute>
                        <AddItemPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Toaster />
            </div>
          </Router>
        </ItemsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

