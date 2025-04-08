"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { users } from "../data/data"
import { useToast } from "@/components/ui/use-toast"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password)

    if (user) {
      const userWithoutPassword = { ...user }
      delete userWithoutPassword.password

      setCurrentUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      })

      return true
    }

    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    })

    return false
  }

  const register = (name, email, password) => {
    // Check if user already exists
    const userExists = users.some((user) => user.email === email)

    if (userExists) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive",
      })
      return false
    }

    // In a real app, we would make an API call to register the user
    // For this demo, we'll just simulate a successful registration
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setCurrentUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    toast({
      title: "Registration successful",
      description: `Welcome, ${name}!`,
    })

    return true
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

