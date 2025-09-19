"use client"

import { motion } from "framer-motion"
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  MapPin,
  Calendar,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

interface Member {
  id: string
  name: string
  type: 'organization' | 'individual'
  role: string
  organization?: string
  location: string
  joinDate: string
  achievements: string[]
  verified: boolean
  rating: number
  avatar: string
  description: string
}

const featuredMembers: Member[] = [
  {
    id: '1',
    name: 'Green Textiles Ltd.',
    type: 'organization',
    role: 'Manufacturing Company',
    location: 'Dhaka, Bangladesh',
    joinDate: 'January 2024',
    achievements: ['Safety Certified', 'Sustainability Leader', 'Top Employer'],
    verified: true,
    rating: 4.9,
    avatar: 'GT',
    description: 'Leading sustainable textile manufacturer with 15+ years of experience in the RMG sector.'
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    type: 'individual',
    role: 'Production Manager',
    organization: 'Prime Garments Ltd.',
    location: 'Chittagong, Bangladesh',
    joinDate: 'February 2024',
    achievements: ['Industry Expert', 'Safety Advocate', 'Mentor'],
    verified: true,
    rating: 4.8,
    avatar: 'SA',
    description: 'Experienced production manager with expertise in lean manufacturing and worker safety.'
  },
  {
    id: '3',
    name: 'Global Sourcing Co.',
    type: 'organization',
    role: 'Buying House',
    location: 'Dhaka, Bangladesh',
    joinDate: 'March 2024',
    achievements: ['Fair Trade Certified', 'Quality Assured', 'Innovation Partner'],
    verified: true,
    rating: 4.7,
    avatar: 'GS',
    description: 'International buying house connecting global brands with ethical manufacturers.'
  }
]

export default function MemberSpotlight() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Member Spotlight</h2>
          <p className="text-gray-600">Featured community members making a difference</p>
        </div>
        <Link 
          href="/directory"
          className="inline-flex items-center px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          View Directory
          <Building2 className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {/* Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {member.avatar}
                </div>
                {member.verified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{member.name}</h3>
                <p className="text-xs text-gray-600">{member.role}</p>
                {member.organization && (
                  <p className="text-xs text-gray-500">{member.organization}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 mb-4 line-clamp-2">{member.description}</p>

            {/* Location & Join Date */}
            <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{member.joinDate}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(member.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-700">{member.rating}</span>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium text-gray-700">Achievements</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {member.achievements.slice(0, 2).map((achievement, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    {achievement}
                  </span>
                ))}
                {member.achievements.length > 2 && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{member.achievements.length - 2}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">2,847</div>
            <div className="text-xs text-gray-500">Total Members</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">1,234</div>
            <div className="text-xs text-gray-500">Verified Organizations</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">98%</div>
            <div className="text-xs text-gray-500">Member Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600">156</div>
            <div className="text-xs text-gray-500">New This Week</div>
          </div>
        </div>
      </div>
    </div>
  )
}
