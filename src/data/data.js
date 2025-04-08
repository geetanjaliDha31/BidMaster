export const users = [
  {
    id: "1",
    name: "Geetanjali Dhanwade",
    email: "geeta@gmail.com",
    password: "password123",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export const items = [
  {
    id: "1",
    title: "Vintage Watch",
    description: "A beautiful vintage watch from the 1950s. In excellent condition with original leather strap.",
    basePrice: 150,
    image: "/image.png",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    sellerId: "1",
    category: "Accessories",
  },
  {
    id: "2",
    title: "Antique Desk",
    description: "Handcrafted oak desk from the early 1900s. Features three drawers and original brass hardware.",
    basePrice: 500,
    image: "/img2.jpg",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    sellerId: "2",
    category: "Furniture",
  },
  {
    id: "3",
    title: "Signed Baseball",
    description: "Baseball signed by legendary player Babe Ruth. Includes certificate of authenticity.",
    basePrice: 1000,
    image: "/img3.jpg",
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    sellerId: "1",
    category: "Sports",
  },
  {
    id: "4",
    title: "Vintage Camera",
    description: "Leica M3 camera from 1954. In working condition with original leather case.",
    basePrice: 800,
    image: "/img4.jpg",
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    sellerId: "2",
    category: "Electronics",
  },
  {
    id: "5",
    title: "First Edition Book",
    description: "First edition of 'To Kill a Mockingbird' by Harper Lee. Excellent condition.",
    basePrice: 350,
    image: "/img5.jpg",
    endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    sellerId: "1",
    category: "Books",
  },
]

export const bids = [
  {
    id: "1",
    itemId: "1",
    userId: "2",
    amount: 175,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "2",
    itemId: "1",
    userId: "1",
    amount: 200,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: "3",
    itemId: "3",
    userId: "2",
    amount: 1200,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: "4",
    itemId: "5",
    userId: "2",
    amount: 400,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
]

