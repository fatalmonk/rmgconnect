"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Search, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Users, 
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
  Eye,
  ThumbsUp
} from "lucide-react"
import Header from "@/components/ui/header"

interface KnowledgeItem {
  id: string
  title: string
  category: string
  type: "guide" | "case-study" | "policy" | "trend" | "compliance"
  content: string
  author: string
  authorRole: string
  publishDate: string
  readTime: number
  views: number
  likes: number
  tags: string[]
  featured: boolean
  language: "en" | "bn"
}

export default function KnowledgePage() {
  const { status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [languageFilter, setLanguageFilter] = useState("")

  // Mock knowledge base data
  const knowledgeItems: KnowledgeItem[] = [
    {
      id: "1",
      title: "Complete Guide to BGMEA Compliance Standards 2024",
      category: "Compliance",
      type: "guide",
      content: "A comprehensive guide covering all BGMEA compliance requirements, including fire safety, building safety, and worker rights...",
      author: "Dr. Ahmed Rahman",
      authorRole: "BGMEA Compliance Officer",
      publishDate: "2024-01-15",
      readTime: 15,
      views: 1247,
      likes: 89,
      tags: ["BGMEA", "Compliance", "Safety", "Standards"],
      featured: true,
      language: "en"
    },
    {
      id: "2",
      title: "Green Factory Certification Process - Step by Step",
      category: "Sustainability",
      type: "guide",
      content: "Learn how to achieve LEED certification for your RMG factory, including energy efficiency, water conservation...",
      author: "Fatima Begum",
      authorRole: "Sustainability Consultant",
      publishDate: "2024-01-10",
      readTime: 12,
      views: 892,
      likes: 67,
      tags: ["LEED", "Green Factory", "Sustainability", "Certification"],
      featured: true,
      language: "en"
    },
    {
      id: "3",
      title: "Case Study: How ABC Garments Reduced Production Costs by 30%",
      category: "Efficiency",
      type: "case-study",
      content: "Real-world example of implementing lean manufacturing principles in a 500-worker RMG factory...",
      author: "Mohammad Ali",
      authorRole: "Factory Manager",
      publishDate: "2024-01-08",
      readTime: 8,
      views: 1563,
      likes: 124,
      tags: ["Lean Manufacturing", "Cost Reduction", "Efficiency", "Case Study"],
      featured: false,
      language: "en"
    },
    {
      id: "4",
      title: "রমগ শিল্পে শ্রমিক অধিকার: একটি সম্পূর্ণ গাইড",
      category: "Labor Rights",
      type: "guide",
      content: "বাংলাদেশের রমগ শিল্পে শ্রমিকদের অধিকার, ন্যূনতম মজুরি, এবং অভিযোগ প্রক্রিয়া সম্পর্কে বিস্তারিত তথ্য...",
      author: "রোকসানা আক্তার",
      authorRole: "শ্রম আইন বিশেষজ্ঞ",
      publishDate: "2024-01-05",
      readTime: 20,
      views: 2103,
      likes: 156,
      tags: ["শ্রমিক অধিকার", "ন্যূনতম মজুরি", "শ্রম আইন"],
      featured: true,
      language: "bn"
    },
    {
      id: "5",
      title: "Export Market Trends: EU vs USA vs Canada",
      category: "Market Intelligence",
      type: "trend",
      content: "Analysis of export opportunities, tariff structures, and buyer preferences across major markets...",
      author: "Sarah Johnson",
      authorRole: "Export Analyst",
      publishDate: "2024-01-03",
      readTime: 10,
      views: 987,
      likes: 78,
      tags: ["Export", "Market Analysis", "EU", "USA", "Canada"],
      featured: false,
      language: "en"
    },
    {
      id: "6",
      title: "Accord/Alliance Transition: What Factory Owners Need to Know",
      category: "Compliance",
      type: "policy",
      content: "Complete guide to transitioning from Accord/Alliance to RSC and maintaining compliance standards...",
      author: "David Chen",
      authorRole: "Safety Auditor",
      publishDate: "2024-01-01",
      readTime: 18,
      views: 1456,
      likes: 112,
      tags: ["Accord", "Alliance", "RSC", "Transition", "Safety"],
      featured: true,
      language: "en"
    }
  ]

  const categories = [
    "All Categories",
    "Compliance",
    "Sustainability", 
    "Efficiency",
    "Labor Rights",
    "Market Intelligence",
    "Technology",
    "Training",
    "Policy Updates"
  ]

  const types = [
    "All Types",
    "Guide",
    "Case Study", 
    "Policy",
    "Trend Analysis",
    "Compliance"
  ]

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = !categoryFilter || item.category === categoryFilter
    const matchesType = !typeFilter || item.type === typeFilter
    const matchesLanguage = !languageFilter || item.language === languageFilter

    return matchesSearch && matchesCategory && matchesType && matchesLanguage
  })

  const featuredItems = filteredItems.filter(item => item.featured)
  const regularItems = filteredItems.filter(item => !item.featured)

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide": return "bg-blue-100 text-blue-800"
      case "case-study": return "bg-green-100 text-green-800"
      case "policy": return "bg-purple-100 text-purple-800"
      case "trend": return "bg-orange-100 text-orange-800"
      case "compliance": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Compliance": return <Shield className="w-5 h-5" />
      case "Sustainability": return <TrendingUp className="w-5 h-5" />
      case "Efficiency": return <TrendingUp className="w-5 h-5" />
      case "Labor Rights": return <Users className="w-5 h-5" />
      case "Market Intelligence": return <TrendingUp className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(59, 130, 246, 0.03) 2px, rgba(59, 130, 246, 0.03) 4px)`
      }}></div>
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community
            </button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Knowledge Base
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Your comprehensive resource for RMG industry insights, compliance guides, 
              best practices, and market intelligence. Learn from experts and share your knowledge.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Knowledge Base
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, guides, case studies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category === "All Categories" ? "" : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {types.map(type => (
                    <option key={type} value={type === "All Types" ? "" : type.toLowerCase().replace(" ", "-")}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Languages</option>
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredItems.length} of {knowledgeItems.length} articles
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("")
                  setTypeFilter("")
                  setLanguageFilter("")
                }}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>

          {/* Featured Articles */}
          {featuredItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                            {item.type.replace("-", " ").toUpperCase()}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Bookmark className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.content}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.readTime} min read
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {item.likes}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">
                            {item.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.author}</p>
                          <p className="text-xs text-gray-600">{item.authorRole}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                        Read More
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                          {item.type.replace("-", " ").toUpperCase()}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Bookmark className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.readTime} min
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {item.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.author}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                      Read
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("")
                  setTypeFilter("")
                  setLanguageFilter("")
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
