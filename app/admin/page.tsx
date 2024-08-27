'use client'
import { unstable_noStore as noStore } from 'next/cache';
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserIcon, FileTextIcon, MessageSquareIcon, TrashIcon, PlusIcon, ThumbsUpIcon } from "lucide-react"
import Link from 'next/link'

// Define types based on your Mongoose models
type User = {
  _id: string;
  username: string;
  email: string;
}

type Comment = {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

type Blog = {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: {
    _id: string;
    title: string;
  };
  user: {
    _id: string;
    username: string;
  };
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export default function Component() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState<User[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [totalLikes, setTotalLikes] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    noStore();
    setIsLoading(true)
    setError(null)
    try {
      if (activeTab === 'users') {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(Array.isArray(data) ? data : [])
      } else if (activeTab === 'blogs') {
        const response = await fetch('/api/blogs')
        const data = await response.json()
        if (Array.isArray(data)) {
          setBlogs(data)
          setTotalLikes(data.reduce((sum, blog) => sum + (blog.likes || 0), 0))
        } else if (data && typeof data === 'object' && Array.isArray(data.blogs)) {
          setBlogs(data.blogs)
          setTotalLikes(data.blogs.reduce((sum: number, blog: Blog) => sum + (blog.likes || 0), 0))
        } else {
          throw new Error('Unexpected data format for blogs')
        }
      } else if (activeTab === 'comments') {
        // Fetch all blogs to get their comments
        const blogsResponse = await fetch('/api/(dashboard)/blogs')
        const blogsData = await blogsResponse.json()
        const blogs = Array.isArray(blogsData) ? blogsData : (blogsData.blogs || [])
        
        // Collect all comments from all blogs
        const allComments = blogs.flatMap(blog => blog.comments || [])
        setComments(allComments)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, blogId?: string) => {
    noStore();
    let endpoint: string;
    if (activeTab === 'users') {
      endpoint = `/api/users/${id}`;
    } else if (activeTab === 'blogs') {
      endpoint = `/api/blogs/${id}`;
    } else if (activeTab === 'comments') {
      if (!blogId) {
        console.error('Blog ID is required to delete a comment');
        return;
      }
      endpoint = `/api/blogs/${blogId}/comment/${id}`;
    } else {
      console.error('Invalid active tab');
      return;
    }

    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      if (response.ok) {
        fetchData();
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <nav>
            <button
              className={`w-full text-left py-2 px-4 rounded ${activeTab === 'users' ? 'bg-blue-100 text-blue-600' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <UserIcon className="inline-block mr-2" size={18} />
              Users
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded ${activeTab === 'blogs' ? 'bg-blue-100 text-blue-600' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <FileTextIcon className="inline-block mr-2" size={18} />
              Blogs
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded ${activeTab === 'comments' ? 'bg-blue-100 text-blue-600' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              <MessageSquareIcon className="inline-block mr-2" size={18} />
              Comments
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold mr-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            
            {activeTab === 'blogs' && (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-3 flex items-center">
                  <ThumbsUpIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-600">{totalLikes} likes</span>
                </CardContent>
              </Card>
            )}
          </div>
          
          {activeTab === 'blogs' && (
            <Link href="/admin/create-blog">
              <Button>
                <PlusIcon className="mr-2" size={18} />
                Create New Blog
              </Button>
            </Link>
          )}
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Tables */}
        {!isLoading && !error && activeTab === 'users' && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user._id)}>
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isLoading && !error && activeTab === 'blogs' && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.user?.username || 'Unknown'}</TableCell>
                  <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{blog.likes}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/edit-blog/${blog._id}`}>
                      <Button variant="ghost" size="icon" className="mr-2">
                        <FileTextIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(blog._id)}>
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isLoading && !error && activeTab === 'comments' && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell>{comment.author}</TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell>{new Date(comment.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(comment._id, comment.blogId)}>
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}