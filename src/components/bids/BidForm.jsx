"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContext"
import { useItems } from "../../context/ItemsContext"
import { formatCurrency } from "../../utils/formatters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const BidForm = ({ item, onBidPlaced }) => {
  const { currentUser } = useAuth()
  const { getHighestBid, placeBid } = useItems()
  const { toast } = useToast()

  const highestBid = getHighestBid(item.id)
  const minBid = highestBid ? highestBid.amount + 1 : item.basePrice + 1

  const [bidAmount, setBidAmount] = useState(minBid)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEnded = new Date(item.endTime) < new Date()
  const isOwner = currentUser && currentUser.id === item.sellerId

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to place a bid",
        variant: "destructive",
      })
      return
    }

    if (isOwner) {
      toast({
        title: "Cannot bid on your own item",
        description: "You cannot bid on items you are selling",
        variant: "destructive",
      })
      return
    }

    if (isEnded) {
      toast({
        title: "Auction ended",
        description: "This auction has already ended",
        variant: "destructive",
      })
      return
    }

    if (bidAmount < minBid) {
      toast({
        title: "Bid too low",
        description: `Minimum bid is ${formatCurrency(minBid)}`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const success = placeBid(item.id, currentUser.id, bidAmount)

      if (success && onBidPlaced) {
        onBidPlaced()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Current highest bid:</span>
          <span className="font-semibold">{highestBid ? formatCurrency(highestBid.amount) : "No bids yet"}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>Minimum bid:</span>
          <span className="font-semibold">{formatCurrency(minBid)}</span>
        </div>
        <div className="flex space-x-2">
          <Input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            min={minBid}
            step="1"
            disabled={isEnded || isOwner || !currentUser || isSubmitting}
          />
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button type="submit" disabled={isEnded || isOwner || !currentUser || isSubmitting}>
              {isSubmitting ? "Placing Bid..." : "Place Bid"}
            </Button>
          </motion.div>
        </div>
      </div>

      {!currentUser && <p className="text-sm text-muted-foreground">Please log in to place a bid</p>}

      {isOwner && <p className="text-sm text-muted-foreground">You cannot bid on your own item</p>}

      {isEnded && <p className="text-sm text-muted-foreground">This auction has ended</p>}
    </form>
  )
}

export default BidForm

