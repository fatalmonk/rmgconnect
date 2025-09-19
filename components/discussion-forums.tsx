"use client"

import { motion } from "framer-motion"
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Clock, 
  ThumbsUp, 
  Reply,
  Star,
  Filter,
  Search,
  Plus,
  ArrowRight,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Discussion {
  id: string
  title: string
  author: string
  authorRole: string
  organization: string
  category: string
  replies: number
  likes: number
  lastActivity: string
  isPinned: boolean
  isHot: boolean
  excerpt: string
  tags: string[]
}

const discussions: Discussion[] = [
  {
    id: '1',
    title: 'Sustainable Manufacturing Practices in RMG Industry',
    author: 'Dr. Ahmed Rahman',
    authorRole: 'Sustainability Expert',
    organization: 'Green Textiles Ltd.',
    category: 'Sustainability',
    replies: 24,
    likes: 18,
    lastActivity: '2 hours ago',
    isPinned: true,
    isHot: true,
    excerpt: 'Discussing innovative approaches to reduce environmental impact while maintaining productivity...',
    tags: ['sustainability', 'manufacturing', 'environment']
  },
  {
    id: '2',
    title: 'Worker Safety Standards and Best Practices',
    author: 'Sarah Ahmed',
    authorRole: 'Safety Officer',
    organization: 'Prime Garments Ltd.',
    category: 'Safety',
    replies: 16,
    likes: 12,
    lastActivity: '4 hours ago',
    isPinned: false,
    isHot: true,
    excerpt: 'Sharing experiences and best practices for maintaining high safety standards in garment factories...',
    tags: ['safety', 'workers', 'standards']
  },
  {
    id: '3',
    title: 'Digital Transformation in Supply Chain Management',
    author: 'Mohammad Hassan',
    authorRole: 'Operations Manager',
    organization: 'Global Sourcing Co.',
    category: 'Technology',
    replies: 8,
    likes: 6,
    lastActivity: '6 hours ago',
    isPinned: false,
    isHot: false,
    excerpt: 'How technology is revolutionizing supply chain transparency and efficiency in the RMG sector...',
    tags: ['technology', 'supply-chain', 'digital']
  },
  {
    id: '4',
    title: 'Quality Control Methods and Standards',
    author: 'Fatima Begum',
    authorRole: 'Quality Manager',
    organization: 'Excellence Garments',
    category: 'Quality',
    replies: 12,
    likes: 9,
    lastActivity: '8 hours ago',
    isPinned: false,
    isHot: false,
    excerpt: 'Discussing effective quality control processes and maintaining international standards...',
    tags: ['quality', 'control', 'standards']
  }
]

const categories = ['All', 'Sustainability', 'Safety', 'Technology', 'Quality', 'General']

export default function DiscussionForums() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'All' || discussion.category === selectedCategory
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sustainability': return 'bg-green-100 text-green-700 border-green-200'
      case 'Safety': return 'bg-red-100 text-red-700 border-red-200'
      case 'Technology': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Quality': return 'bg-purple-100 text-purple-700 border-purple-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Discussion Forums</h2>
          <p className="text-gray-600">Connect with industry experts and share knowledge</p>
        </div>
        <Link 
          href="/community"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Start Discussion
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion, index) => (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {discussion.isPinned && (
                  <div className="p-1 bg-yellow-100 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-600 fill-current" />
                  </div>
                )}
                {discussion.isHot && (
                  <div className="p-1 bg-red-100 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                )}
                <div className={`px-3 py-1 rounded-lg border text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                  {discussion.category}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
              {discussion.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {discussion.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {discussion.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author and Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {discussion.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{discussion.author}</div>
                    <div className="text-xs text-gray-500">{discussion.organization}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{discussion.replies}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{discussion.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{discussion.lastActivity}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-xs text-gray-500">Active Discussions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-xs text-gray-500">Total Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-xs text-gray-500">Response Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
