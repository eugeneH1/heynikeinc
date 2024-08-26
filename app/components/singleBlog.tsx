import { useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft, Clock, ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: "Getting Started with React: A Comprehensive Guide",
  category: "React",
  date: "May 15, 2023",
  author: "Jane Doe",
  authorAvatar: "/placeholder.svg?height=40&width=40",
  readTime: "8 min read",
  content: `
    <p>React has revolutionized the way we build user interfaces. As a JavaScript library for building user interfaces, it has gained immense popularity among developers worldwide. In this comprehensive guide, we'll walk you through the basics of React and help you get started with building your first React application.</p>

    <h2>What is React?</h2>
    <p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>

    <h2>Setting Up Your Development Environment</h2>
    <p>Before we dive into React, let's set up our development environment. You'll need Node.js and npm (Node Package Manager) installed on your computer. Once you have these, you can create a new React project using Create React App, a comfortable environment for learning React.</p>

    <pre><code>npx create-react-app my-first-react-app
cd my-first-react-app
npm start</code></pre>

    <h2>Understanding Components</h2>
    <p>Components are the building blocks of any React application. A component is a self-contained module that renders some output. We can write interface elements like a button or an input field as a React component.</p>

    <h2>JSX: JavaScript + XML</h2>
    <p>React uses JSX, a syntax extension for JavaScript. JSX allows you to write HTML elements in JavaScript and place them in the DOM without using methods like createElement() or appendChild().</p>

    <h2>State and Props</h2>
    <p>State is an object that holds some information that may change over the lifetime of the component. Props (short for properties) are inputs to a React component. They are data passed down from a parent component to a child component.</p>

    <h2>Conclusion</h2>
    <p>This guide has only scratched the surface of what's possible with React. As you continue your journey, you'll discover hooks, context, and many other powerful features that make React a joy to work with. Happy coding!</p>
  `,
  likes: 42,
  comments: 15,
}

export default function SingleBlogPost() {
  const router = useRouter()
  const [likes, setLikes] = useState(blogPost.likes)

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1)
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <Badge>{blogPost.category}</Badge>
          <span>{blogPost.date}</span>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {blogPost.readTime}
          </div>
        </div>
      </header>

      <div className="flex items-center space-x-4 mb-8">
        <Avatar>
          <AvatarImage src={blogPost.authorAvatar} alt={blogPost.author} />
          <AvatarFallback>{blogPost.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{blogPost.author}</p>
          <p className="text-sm text-muted-foreground">Author</p>
        </div>
      </div>

      <Separator className="my-8" />

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blogPost.content }}
      />

      <Separator className="my-8" />

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={handleLike}>
            <ThumbsUp className="mr-2 h-4 w-4" />
            Like ({likes})
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Comment ({blogPost.comments})
          </Button>
        </div>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </article>
  )
}