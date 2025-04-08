"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Clock } from "lucide-react"
import { useItems } from "../../context/ItemsContext"
import { formatCurrency, formatTimeLeft } from "../../utils/formatters"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const ItemCard = ({ item }) => {
  const { getHighestBid } = useItems()
  const highestBid = getHighestBid(item.id)

  const timeLeft = formatTimeLeft(new Date(item.endTime))
  const isEnded = new Date(item.endTime) < new Date()

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link to={`/items/${item.id}`}>
        <Card className="overflow-hidden h-full">
          <div className="relative h-48 overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <Badge
              variant={isEnded ? "destructive" : "secondary"}
              className="absolute top-2 right-2 flex items-center gap-1"
            >
              <Clock className="h-3 w-3" />
              {isEnded ? "Ended" : timeLeft}
            </Badge>
          </div>
          <CardContent className="p-4">
            <div className="mb-2">
              <Badge variant="outline">{item.category}</Badge>
            </div>
            <h3 className="text-lg font-semibold line-clamp-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{item.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Starting bid</p>
              <p className="font-semibold">{formatCurrency(item.basePrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current bid</p>
              <p className="font-semibold">{highestBid ? formatCurrency(highestBid.amount) : "No bids yet"}</p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

export default ItemCard

