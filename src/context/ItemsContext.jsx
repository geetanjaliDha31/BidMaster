"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { items as initialItems, bids as initialBids } from "../data/data"
import { useToast } from "@/components/ui/use-toast"

const ItemsContext = createContext()

export const useItems = () => useContext(ItemsContext)

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, we would fetch items from an API
    setItems(initialItems)
    setBids(initialBids)
    setLoading(false)
  }, [])

  const getItemById = (id) => {
    return items.find((item) => item.id === id)
  }

  const getItemBids = (itemId) => {
    return bids.filter((bid) => bid.itemId === itemId)
  }

  const getHighestBid = (itemId) => {
    const itemBids = getItemBids(itemId)
    if (itemBids.length === 0) return null

    return itemBids.reduce((prev, current) => (prev.amount > current.amount ? prev : current))
  }

  const getUserItems = (userId) => {
    return items.filter((item) => item.sellerId === userId)
  }

  const getUserBids = (userId) => {
    return bids.filter((bid) => bid.userId === userId)
  }

  const addItem = (newItem) => {
    const itemToAdd = {
      ...newItem,
      id: (items.length + 1).toString(),
      endTime: new Date(newItem.endTime).toISOString(),
    }

    setItems([...items, itemToAdd])

    toast({
      title: "Item added",
      description: "Your item has been added successfully",
    })

    return itemToAdd
  }

  const placeBid = (itemId, userId, amount) => {
    const item = getItemById(itemId)
    const highestBid = getHighestBid(itemId)

    if (!item) {
      toast({
        title: "Bid failed",
        description: "Item not found",
        variant: "destructive",
      })
      return false
    }

    if (item.sellerId === userId) {
      toast({
        title: "Bid failed",
        description: "You cannot bid on your own item",
        variant: "destructive",
      })
      return false
    }

    if (new Date(item.endTime) < new Date()) {
      toast({
        title: "Bid failed",
        description: "This auction has ended",
        variant: "destructive",
      })
      return false
    }

    if (amount <= item.basePrice) {
      toast({
        title: "Bid failed",
        description: "Bid must be higher than the base price",
        variant: "destructive",
      })
      return false
    }

    if (highestBid && amount <= highestBid.amount) {
      toast({
        title: "Bid failed",
        description: "Bid must be higher than the current highest bid",
        variant: "destructive",
      })
      return false
    }

    const newBid = {
      id: (bids.length + 1).toString(),
      itemId,
      userId,
      amount,
      timestamp: new Date().toISOString(),
    }

    setBids([...bids, newBid])

    toast({
      title: "Bid placed",
      description: `Your bid of $${amount} has been placed successfully`,
    })

    return true
  }

  const value = {
    items,
    bids,
    loading,
    getItemById,
    getItemBids,
    getHighestBid,
    getUserItems,
    getUserBids,
    addItem,
    placeBid,
  }

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}

