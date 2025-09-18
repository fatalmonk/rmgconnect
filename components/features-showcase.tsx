"use client"

import { motion } from "framer-motion"
import { ShieldAlert, Users, FileText, BarChart3, CheckCircle, Eye } from "lucide-react"

const features = [
  {
    icon: ShieldAlert,
    title: "Secure Fraud Reporting",
    description: "Submit detailed fraud reports with evidence uploads, ensuring your information is protected and confidential.",
    color: "red",
    delay: 0
  },
  {
    icon: Users,
    title: "Role-Based Access Control",
    description: "Different access levels for factories, buyers, brands, and administrators with appropriate permissions.",
    color: "blue",
    delay: 0.1
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track fraud patterns, generate reports, and gain insights to prevent future incidents.",
    color: "green",
    delay: 0.2
  },
  {
    icon: FileText,
    title: "Evidence Management",
    description: "Upload and organize supporting documents, images, and files to strengthen your fraud reports.",
    color: "purple",
    delay: 0.3
  },
  {
    icon: CheckCircle,
    title: "Professional Review Process",
    description: "Expert review and verification process ensures quality and accuracy of all reports.",
    color: "yellow",
    delay: 0.4
  },
  {
    icon: Eye,
    title: "Public Awareness",
    description: "Browse published reports to stay informed about fraud patterns and protect your business.",
    color: "indigo",
    delay: 0.5
  }
]

const colorClasses = {
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  yellow: "bg-yellow-100 text-yellow-600",
  indigo: "bg-indigo-100 text-indigo-600"
}

export default function FeaturesShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Everything you need to fight fraud
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Our platform provides comprehensive tools to help you identify, report, and prevent fraud in the RMG industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
