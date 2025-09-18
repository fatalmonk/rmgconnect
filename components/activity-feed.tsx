"use client"

import { motion } from "framer-motion"
import { 
  FileText, 
  CheckCircle, 
  Users, 
  ShieldAlert, 
  TrendingUp,
  MessageCircle,
  Heart,
  Share2,
  Clock
} from "lucide-react"

interface ActivityItem {
  id: string
  user: {
    name: string
    company: string
    role: string
    avatar?: string
    verified: boolean
  }
  action: string
  type: "report" | "verification" | "profile" | "resolution" | "discussion" | "achievement"
  target?: string
  content?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  onLike?: (activityId: string) => void
  onComment?: (activityId: string) => void
  onShare?: (activityId: string) => void
}

export default function ActivityFeed({ activities, onLike, onComment, onShare }: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "report": return <FileText className="w-5 h-5" />
      case "verification": return <CheckCircle className="w-5 h-5" />
      case "profile": return <Users className="w-5 h-5" />
      case "resolution": return <ShieldAlert className="w-5 h-5" />
      case "discussion": return <MessageCircle className="w-5 h-5" />
      case "achievement": return <TrendingUp className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "report": return "bg-blue-100 text-blue-600"
      case "verification": return "bg-green-100 text-green-600"
      case "profile": return "bg-purple-100 text-purple-600"
      case "resolution": return "bg-red-100 text-red-600"
      case "discussion": return "bg-yellow-100 text-yellow-600"
      case "achievement": return "bg-indigo-100 text-indigo-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all"
        >
          {/* Activity Header */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold flex-shrink-0">
              {activity.user.avatar ? (
                <img src={activity.user.avatar} alt={activity.user.name} className="w-12 h-12 rounded-full" />
              ) : (
                activity.user.name.split(' ').map(n => n[0]).join('')
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{activity.user.name}</h3>
                {activity.user.verified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{activity.user.company}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{activity.user.role}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTimestamp(activity.timestamp)}</span>
              </div>
            </div>

            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
          </div>

          {/* Activity Content */}
          <div className="mb-4">
            <p className="text-gray-900">
              <span className="font-medium">{activity.user.name}</span>{" "}
              {activity.action}
              {activity.target && (
                <span className="font-medium text-indigo-600"> {activity.target}</span>
              )}
            </p>
            
            {activity.content && (
              <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700">{activity.content}</p>
              </div>
            )}
          </div>

          {/* Activity Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => onLike?.(activity.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activity.isLiked 
                    ? "bg-red-100 text-red-600" 
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Heart className={`w-4 h-4 ${activity.isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">{activity.likes}</span>
              </button>

              <button
                onClick={() => onComment?.(activity.id)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{activity.comments}</span>
              </button>

              <button
                onClick={() => onShare?.(activity.id)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">{activity.shares}</span>
              </button>
            </div>

            <div className="text-sm text-gray-500">
              {activity.type.replace("-", " ").toUpperCase()}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: activities.length * 0.1 }}
        className="text-center pt-6"
      >
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium">
          Load More Activity
        </button>
      </motion.div>
    </div>
  )
}
