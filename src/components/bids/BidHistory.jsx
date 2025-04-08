import { useItems } from "../../context/ItemsContext"
import { formatCurrency, formatDate } from "../../utils/formatters"
import { users } from "../../data/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const BidHistory = ({ itemId }) => {
  const { getItemBids } = useItems()
  const bids = getItemBids(itemId)

  // Sort bids by timestamp (newest first)
  const sortedBids = [...bids].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  if (sortedBids.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bid History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">No bids have been placed yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bid History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedBids.map((bid) => {
            const bidder = users.find((user) => user.id === bid.userId)

            return (
              <div key={bid.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={bidder?.avatar} alt={bidder?.name} />
                    <AvatarFallback>{bidder?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{bidder?.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(new Date(bid.timestamp))}</p>
                  </div>
                </div>
                <p className="font-semibold">{formatCurrency(bid.amount)}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default BidHistory

