"use client"

import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Star,
  Award,
  BookOpen,
  Briefcase
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'conference' | 'workshop' | 'webinar' | 'meeting' | 'training'
  attendees: number
  maxAttendees: number
  isOnline: boolean
  isFeatured: boolean
  organizer: string
  tags: string[]
  registrationLink?: string
}

const events: Event[] = [
  {
    id: '1',
    title: 'RMG Industry Sustainability Summit 2024',
    description: 'Join industry leaders to discuss sustainable practices and environmental responsibility in the RMG sector.',
    date: '2024-10-15',
    time: '09:00 - 17:00',
    location: 'Bangladesh Convention Centre, Dhaka',
    type: 'conference',
    attendees: 156,
    maxAttendees: 300,
    isOnline: false,
    isFeatured: true,
    organizer: 'Bangladesh Garment Manufacturers Association',
    tags: ['sustainability', 'environment', 'industry'],
    registrationLink: 'https://example.com/register'
  },
  {
    id: '2',
    title: 'Digital Transformation in Supply Chain',
    description: 'Learn how technology is revolutionizing supply chain management in the garment industry.',
    date: '2024-10-20',
    time: '14:00 - 16:00',
    location: 'Online Webinar',
    type: 'webinar',
    attendees: 89,
    maxAttendees: 200,
    isOnline: true,
    isFeatured: false,
    organizer: 'Tech Solutions Ltd.',
    tags: ['technology', 'supply-chain', 'digital'],
    registrationLink: 'https://example.com/webinar'
  },
  {
    id: '3',
    title: 'Worker Safety Training Workshop',
    description: 'Comprehensive training on workplace safety standards and emergency response procedures.',
    date: '2024-10-25',
    time: '10:00 - 15:00',
    location: 'Chittagong Export Processing Zone',
    type: 'workshop',
    attendees: 45,
    maxAttendees: 50,
    isOnline: false,
    isFeatured: false,
    organizer: 'Safety First Initiative',
    tags: ['safety', 'training', 'workers'],
    registrationLink: 'https://example.com/safety-training'
  },
  {
    id: '4',
    title: 'Quality Control Excellence Program',
    description: 'Advanced training on quality control methods and international standards compliance.',
    date: '2024-11-02',
    time: '09:00 - 17:00',
    location: 'Sylhet Garment Training Institute',
    type: 'training',
    attendees: 32,
    maxAttendees: 40,
    isOnline: false,
    isFeatured: false,
    organizer: 'Quality Assurance Board',
    tags: ['quality', 'training', 'standards'],
    registrationLink: 'https://example.com/quality-training'
  },
  {
    id: '5',
    title: 'Monthly Industry Roundtable',
    description: 'Monthly discussion on industry challenges, opportunities, and policy updates.',
    date: '2024-11-08',
    time: '15:00 - 17:00',
    location: 'RMG Connect Virtual Room',
    type: 'meeting',
    attendees: 78,
    maxAttendees: 100,
    isOnline: true,
    isFeatured: false,
    organizer: 'RMG Connect Community',
    tags: ['discussion', 'policy', 'industry'],
    registrationLink: 'https://example.com/roundtable'
  }
]

const eventTypes = ['All', 'Conference', 'Workshop', 'Webinar', 'Meeting', 'Training']

const getEventTypeIcon = (type: string) => {
  switch (type) {
    case 'conference': return <Users className="w-5 h-5" />
    case 'workshop': return <BookOpen className="w-5 h-5" />
    case 'webinar': return <ExternalLink className="w-5 h-5" />
    case 'meeting': return <Users className="w-5 h-5" />
    case 'training': return <Briefcase className="w-5 h-5" />
    default: return <Calendar className="w-5 h-5" />
  }
}

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'conference': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'workshop': return 'bg-green-100 text-green-700 border-green-200'
    case 'webinar': return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'meeting': return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'training': return 'bg-red-100 text-red-700 border-red-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export default function EventCalendar() {
  const [selectedType, setSelectedType] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'All' || event.type === selectedType.toLowerCase()
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesType && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    return eventDate >= today
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Industry Events</h2>
          <p className="text-gray-600">Stay updated with upcoming conferences, workshops, and training sessions</p>
        </div>
        <Link 
          href="/events"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedType === type
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {event.isFeatured && (
                  <div className="p-1 bg-yellow-100 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-600 fill-current" />
                  </div>
                )}
                <div className={`px-3 py-1 rounded-lg border text-xs font-medium flex items-center space-x-1 ${getEventTypeColor(event.type)}`}>
                  {getEventTypeIcon(event.type)}
                  <span className="capitalize">{event.type}</span>
                </div>
                {event.isOnline && (
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Online
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
              {event.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {event.isOnline ? (
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                ) : (
                  <MapPin className="w-4 h-4 text-red-600" />
                )}
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {event.organizer.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{event.organizer}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees}/{event.maxAttendees}</span>
                </div>
                {event.registrationLink && (
                  <Link
                    href={event.registrationLink}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Register
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-xs text-gray-500">Upcoming Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">456</div>
            <div className="text-xs text-gray-500">Total Attendees</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-xs text-gray-500">Online Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4</div>
            <div className="text-xs text-gray-500">Featured Events</div>
          </div>
        </div>
      </div>
    </div>
  )
}
