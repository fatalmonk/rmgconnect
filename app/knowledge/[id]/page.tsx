"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, MessageCircle, User, Building2, Calendar, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Post {
  id: string
  title: string
  content: string
  excerpt: string | null
  published: boolean
  createdAt: string
  author: {
    id: string
    name: string | null
    email: string
    role: string
    organization: {
      name: string
      type: string
    } | null
  }
  comments: Array<{
    id: string
    content: string
    createdAt: string
    author: {
      id: string
      name: string | null
      email: string
      role: string
      organization: {
        name: string
        type: string
      } | null
    }
  }>
  _count: {
    comments: number
  }
}

export default function PostDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setPost(data)
        }
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement comment submission with user authentication
    console.log("Submitting comment:", newComment)
    setNewComment("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
          <p className="text-gray-600 mb-4">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/knowledge"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Hub
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/knowledge"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Knowledge Hub
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{post.author.name || "Anonymous"}</span>
                {post.author.organization && (
                  <>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      <span>{post.author.organization.name}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>{post._count.comments} comments</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {post.author.role.replace("_", " ")}
              </span>
            </div>

            {post.excerpt && (
              <p className="text-lg text-gray-600 italic">
                {post.excerpt}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="prose max-w-none">
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Comments ({post._count.comments})
              </h2>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="mb-4">
                  <textarea
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on this article..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {comment.author.name || "Anonymous"}
                          </p>
                          <div className="flex items-center text-sm text-gray-600">
                            {comment.author.organization && (
                              <>
                                <Building2 className="w-3 h-3 mr-1" />
                                <span className="mr-2">{comment.author.organization.name}</span>
                              </>
                            )}
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {comment.author.role.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-gray-700 ml-11">{comment.content}</p>
                  </div>
                ))}

                {post.comments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Author</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {post.author.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-600">{post.author.role.replace("_", " ")}</p>
                  </div>
                </div>
                {post.author.organization && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{post.author.organization.name}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Article Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Article Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Published</span>
                  <span className="font-medium text-gray-900">{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="font-medium text-gray-900">{post._count.comments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-gray-900">
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
