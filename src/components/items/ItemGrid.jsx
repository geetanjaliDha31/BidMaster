"use client"

import { useState } from "react"
import { useItems } from "../../context/ItemsContext"
import ItemCard from "./ItemCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ItemGrid = () => {
  const { items, loading } = useItems()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortBy, setSortBy] = useState("endTime")

  if (loading) {
    return <div className="text-center py-10">Loading items...</div>
  }

  // Get unique categories
  const categories = [...new Set(items.map((item) => item.category))]

  // Filter items
  let filteredItems = items

  if (searchTerm) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (categoryFilter) {
    filteredItems = filteredItems.filter((item) => item.category === categoryFilter)
  }

  // Sort items
  switch (sortBy) {
    case "priceAsc":
      filteredItems = [...filteredItems].sort((a, b) => a.basePrice - b.basePrice)
      break
    case "priceDesc":
      filteredItems = [...filteredItems].sort((a, b) => b.basePrice - a.basePrice)
      break
    case "endTime":
      filteredItems = [...filteredItems].sort((a, b) => new Date(a.endTime) - new Date(b.endTime))
      break
    case "title":
      filteredItems = [...filteredItems].sort((a, b) => a.title.localeCompare(b.title))
      break
    default:
      break
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="endTime">Ending Soon</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No items found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemGrid

