'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { useParams } from 'next/navigation'

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: { _id: string; title: string } | string;
  createdAt: string;
  user: { _id: string; username: string };
  likes: number;
  comments: Comment[];
}

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function BlogPost() {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [newComment, setNewComment] = useState('')
  const [commentAuthor, setCommentAuthor] = useState('')
  const params = useParams()
  const blogId = params.blog as string

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${blogId}`)
        if (response.ok) {
          const data = await response.json()
          setBlog(data.blog)
        } else {
          console.error('Failed to fetch blog:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
      }
    }

    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const handleLike = async () => {
    if (!blog) return

    try {
      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        setBlog({ ...blog, likes: data.likes })
      } else {
        console.error('Failed to like blog:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!blog || !newComment.trim() || !commentAuthor.trim()) return

    try {
      const response = await fetch(`/api/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: commentAuthor, content: newComment }),
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Comment response:', data)
        if (data.comment) {
          setBlog(prevBlog => ({
            ...prevBlog!,
            comments: [...prevBlog!.comments, data.comment],
          }))
          setNewComment('')
          setCommentAuthor('')
        } else {
          console.error('Comment data is missing in the response')
        }
      } else {
        const errorData = await response.json()
        console.error('Failed to add comment:', response.status, response.statusText, errorData)
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (!blog) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <article className="prose dark:prose-invert lg:prose-xl">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>By {blog.user.username}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-xl text-muted-foreground">{blog.description}</p>
        <div className="mt-4">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleLike}>
          <Heart className="mr-2 h-4 w-4" />
          Like
        </Button>
        <span className="text-sm text-muted-foreground">{blog.likes} likes</span>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="space-y-2">
          <Input
            placeholder="Your name"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
          />
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit">Post Comment</Button>
        </form>
        <div className="space-y-4">
          {blog.comments.map((comment) => (
            <div key={comment._id} className="flex space-x-4 items-start">
              <Avatar>
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">{comment.author}</p>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
                <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}