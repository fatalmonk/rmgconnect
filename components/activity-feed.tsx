"use client"

import { motion } from "framer-motion"
import { 
  Building2, 
  Briefcase, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  Calendar,
  MessageCircle,
  Star,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

interface ActivityItem {
  id: string
  type: 'job' | 'organization' | 'report' | 'discussion' | 'achievement'
  title: string
  description: string
  timestamp: string
  user: string
  organization?: string
  icon: any
  color: string
  bgColor: string
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'job',
    title: 'New Job Posted',
    description: 'Senior Production Manager position at Green Textiles Ltd.',
    timestamp: '2 hours ago',
    user: 'HR Team',
    organization: 'Green Textiles Ltd.',
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: '2',
    type: 'organization',
    title: 'Organization Verified',
    description: 'Prime Garments Ltd. has been verified and added to directory.',
    timestamp: '4 hours ago',
    user: 'Admin Team',
    organization: 'Prime Garments Ltd.',
    icon: Building2,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: '3',
    type: 'report',
    title: 'Safety Report Published',
    description: 'New safety guidelines for factory workers published.',
    timestamp: '6 hours ago',
    user: 'Safety Officer',
    icon: ShieldAlert,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    id: '4',
    type: 'discussion',
    title: 'Industry Discussion',
    description: 'New discussion: "Sustainable Manufacturing Practices"',
    timestamp: '8 hours ago',
    user: 'Industry Expert',
    icon: MessageCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Milestone Reached',
    description: 'Community reached 2,800+ active members!',
    timestamp: '1 day ago',
    user: 'System',
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
]

export default function ActivityFeed() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Activity</h2>
          <p className="text-gray-600">Latest updates from the RMG community</p>
        </div>
        <Link 
          href="/community"
          className="inline-flex items-center px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <div className={`p-3 rounded-xl ${activity.bgColor} group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{activity.title}</h3>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">by</span>
                  <span className="text-xs font-medium text-gray-700">{activity.user}</span>
                  {activity.organization && (
                    <>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{activity.organization}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-xs text-gray-500">New Jobs Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs text-gray-500">New Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-gray-500">Discussions</div>
          </div>
        </div>
      </div>
    </div>
  )
}