"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useItems } from "../context/ItemsContext"
import { formatCurrency } from "../utils/formatters"
import ItemCard from "../components/items/ItemCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserDashboardPage = () => {
  const { currentUser } = useAuth()
  const { getUserItems, getUserBids, getItemById } = useItems()
  const [activeTab, setActiveTab] = useState("listings")

  if (!currentUser) {
    return <div>Loading...</div>
  }

  const userItems = getUserItems(currentUser.id)
  const userBids = getUserBids(currentUser.id)

  // Get unique items the user has bid on
  const biddedItemIds = [...new Set(userBids.map((bid) => bid.itemId))]
  const biddedItems = biddedItemIds.map((itemId) => getItemById(itemId))

  // Get the highest bid for each item
  const biddedItemsWithBids = biddedItems.map((item) => {
    const userHighestBid = userBids
      .filter((bid) => bid.itemId === item.id)
      .reduce((prev, current) => (prev.amount > current.amount ? prev : current), userBids[0])

    return {
      ...item,
      userHighestBid,
    }
  })

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-2xl">{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <p className="text-muted-foreground">{currentUser.email}</p>
              </div>
              <Button asChild>
                <Link to="/add-item" className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Item
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="bids">My Bids</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          {userItems.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Listings Yet</CardTitle>
                <CardDescription>You haven't listed any items for auction yet.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <Button asChild>
                  <Link to="/add-item" className="flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Your First Item
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          {biddedItemsWithBids.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Bids Yet</CardTitle>
                <CardDescription>You haven't placed any bids yet.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                <Button asChild>
                  <Link to="/" className="flex items-center">
                    Browse Items
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {biddedItemsWithBids.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 sm:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">
                        <Link to={`/items/${item.id}`} className="hover:underline">
                          {item.title}
                        </Link>
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Your highest bid</p>
                          <p className="font-semibold">{formatCurrency(item.userHighestBid.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Starting price</p>
                          <p className="font-semibold">{formatCurrency(item.basePrice)}</p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/items/${item.id}`}>View Item</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserDashboardPage

