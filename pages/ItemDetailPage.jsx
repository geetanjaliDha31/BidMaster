"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock, ArrowLeft } from "lucide-react"
import { useItems } from "../context/ItemsContext"
import { formatCurrency, formatTimeLeft, formatDate } from "../utils/formatters"
import { users } from "../data/data"
import BidForm from "../components/bids/BidForm"
import BidHistory from "../components/bids/BidHistory"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ItemDetailPage = () => {
  const { id } = useParams()
  const { getItemById, getHighestBid } = useItems()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchItem = () => {
      const foundItem = getItemById(id)
      setItem(foundItem)
      setLoading(false)
    }

    fetchItem()
  }, [id, getItemById, refreshKey])

  useEffect(() => {
    if (!item) return

    const updateTimeLeft = () => {
      const timeLeftStr = formatTimeLeft(new Date(item.endTime))
      setTimeLeft(timeLeftStr)
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [item])

  const handleBidPlaced = () => {
    setRefreshKey((prev) => prev + 1)
  }

  if (loading) {
    return <div className="text-center py-10">Loading item details...</div>
  }

  if (!item) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  const highestBid = getHighestBid(item.id)
  const seller = users.find((user) => user.id === item.sellerId)
  const isEnded = new Date(item.endTime) < new Date()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to listings
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative rounded-lg overflow-hidden">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-auto object-cover" />
            <Badge
              variant={isEnded ? "destructive" : "secondary"}
              className="absolute top-4 right-4 flex items-center gap-1"
            >
              <Clock className="h-3 w-3" />
              {isEnded ? "Auction Ended" : timeLeft}
            </Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{item.category}</Badge>
              <p className="text-sm text-muted-foreground">Ends: {formatDate(new Date(item.endTime))}</p>
            </div>
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <div className="flex items-center mt-4 space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={seller?.avatar} alt={seller?.name} />
                <AvatarFallback>{seller?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">
                Listed by <span className="font-medium">{seller?.name}</span>
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Starting bid</p>
                  <p className="text-xl font-bold">{formatCurrency(item.basePrice)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current bid</p>
                  <p className="text-xl font-bold">{highestBid ? formatCurrency(highestBid.amount) : "No bids yet"}</p>
                </div>
              </div>

              <BidForm item={item} onBidPlaced={handleBidPlaced} />
            </CardContent>
          </Card>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="bids">Bid History</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <p className="whitespace-pre-line">{item.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bids" className="mt-4">
              <BidHistory itemId={item.id} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

export default ItemDetailPage

