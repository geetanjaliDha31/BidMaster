"use client"

import { motion } from "framer-motion"
import ItemGrid from "../components/items/ItemGrid"

const HomePage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 py-8"
      >
        <h1 className="text-4xl font-bold tracking-tight">Discover Unique Items at BidMaster</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find rare collectibles, vintage items, and more. Place your bids and win!
        </p>
      </motion.div>

      <ItemGrid />
    </div>
  )
}

export default HomePage

