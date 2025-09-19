"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ShieldAlert, BarChart3, ArrowRight, Users, Globe, Building2, Briefcase, TrendingUp, Award, Calendar, BookOpen } from "lucide-react"
import Header from "@/components/ui/header"
import FeaturesShowcase from "@/components/features-showcase"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import ActivityFeed from "@/components/activity-feed"
import MemberSpotlight from "@/components/member-spotlight"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-red-50 scroll-smooth">
      {/* Background pattern */}
      <div className="absolute inset-0 background-pattern"></div>
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm border border-green-200 mb-8 shadow-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <Globe className="w-4 h-4 mr-2 text-green-600" />
              Live Platform - 2,847 Active Members
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Bangladesh&apos;s Premier{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
                RMG Community Hub
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Connecting factories, workers, buyers, and suppliers in Bangladesh&apos;s Ready-Made Garments industry. 
              Building transparency, safety, and sustainable growth through technology and community collaboration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link
                href="/directory"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <Building2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Explore Organizations
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/jobs"
                className="group inline-flex items-center px-10 py-5 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <Briefcase className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Find Jobs
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-green-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 text-center">500+</div>
                <div className="text-sm text-gray-600 font-medium text-center">Verified Organizations</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 text-center">1,200+</div>
                <div className="text-sm text-gray-600 font-medium text-center">Active Job Listings</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2 text-center">2,847</div>
                <div className="text-sm text-gray-600 font-medium text-center">Community Members</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 text-center">95%</div>
                <div className="text-sm text-gray-600 font-medium text-center">Safety Compliance</div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              <Link href="/jobs" className="group flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="p-4 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900 text-lg">Job Board</span>
                <span className="text-sm text-gray-600 mt-1">1,200+ Opportunities</span>
              </Link>
              
              <Link href="/directory" className="group flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="p-4 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-200 transition-colors">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <span className="font-semibold text-gray-900 text-lg">Directory</span>
                <span className="text-sm text-gray-600 mt-1">500+ Organizations</span>
              </Link>
              
              <Link href="/knowledge" className="group flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="p-4 bg-purple-100 rounded-2xl mb-4 group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <span className="font-semibold text-gray-900 text-lg">Knowledge Hub</span>
                <span className="text-sm text-gray-600 mt-1">Industry Resources</span>
              </Link>
              
              <Link href="/fraud" className="group flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="p-4 bg-red-100 rounded-2xl mb-4 group-hover:bg-red-200 transition-colors">
                  <ShieldAlert className="w-8 h-8 text-red-600" />
                </div>
                <span className="font-semibold text-gray-900 text-lg">Fraud Alerts</span>
                <span className="text-sm text-gray-600 mt-1">Safety First</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* Community Dashboard Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivityFeed />
            <MemberSpotlight />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesShowcase />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to connect with Bangladesh&apos;s RMG industry?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join RMGConnect and be part of the digital transformation of Bangladesh&apos;s Ready-Made Garments sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center px-8 py-4 border border-green-300 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Explore Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">
                <span className="text-green-400">RMG</span>Connect
              </div>
              <p className="text-gray-400">
                Connecting Bangladesh&apos;s Ready-Made Garments industry through digital innovation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/directory" className="hover:text-white transition-colors">Directory</Link></li>
                <li><Link href="/jobs" className="hover:text-white transition-colors">Job Board</Link></li>
                <li><Link href="/knowledge" className="hover:text-white transition-colors">Knowledge Hub</Link></li>
                <li><Link href="/fraud" className="hover:text-white transition-colors">Fraud Alerts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RMGConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}