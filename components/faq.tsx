"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "How secure is my data on RMGConnect?",
    answer: "We use enterprise-grade security measures including end-to-end encryption, secure data centers, and regular security audits. Your data is protected with the same level of security used by major financial institutions."
  },
  {
    question: "Can I upload evidence files with my fraud reports?",
    answer: "Yes, you can upload various types of evidence including documents, images, videos, and other files. We support most common file formats and provide secure storage for all evidence."
  },
  {
    question: "Who can see my fraud reports?",
    answer: "Your reports are only visible to authorized personnel based on your role. Public reports are only shown after they've been reviewed and approved by our admin team. You can also choose to keep reports private."
  },
  {
    question: "How long does it take to review a fraud report?",
    answer: "Our review process typically takes 2-5 business days. Complex cases may take longer, but we'll keep you updated on the status throughout the review process."
  },
  {
    question: "Can I edit or update my fraud reports after submission?",
    answer: "You can add additional evidence or comments to your reports after submission, but the core details cannot be changed to maintain the integrity of the reporting process."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Our platform is fully responsive and works great on mobile devices. We're also developing a dedicated mobile app that will be available soon."
  }
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-indigo-600" />
        ) : (
          <Plus className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4"
        >
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Everything you need to know about RMGConnect
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
