import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Mock data for blog posts
const blogPosts = [
  { 
    id: 1, 
    title: "Getting Started with React", 
    category: "React", 
    date: "2023-05-15",
    excerpt: "Learn the basics of React and start building your first component-based application.",
    author: "Jane Doe"
  },
  { 
    id: 2, 
    title: "Advanced TypeScript Techniques", 
    category: "TypeScript", 
    date: "2023-06-02",
    excerpt: "Dive deep into TypeScript's advanced features and improve your code quality.",
    author: "John Smith"
  },
  { 
    id: 3, 
    title: "CSS Grid Layout Mastery", 
    category: "CSS", 
    date: "2023-06-10",
    excerpt: "Master CSS Grid Layout and create complex, responsive layouts with ease.",
    author: "Emily Johnson"
  },
  { 
    id: 4, 
    title: "Node.js Best Practices", 
    category: "Node.js", 
    date: "2023-06-18",
    excerpt: "Explore best practices for building scalable and maintainable Node.js applications.",
    author: "Michael Brown"
  },
  { 
    id: 5, 
    title: "Introduction to Next.js", 
    category: "Next.js", 
    date: "2023-06-25",
    excerpt: "Get started with Next.js and learn how to build server-side rendered React applications.",
    author: "Sarah Wilson"
  },
]

const categories = ["React", "TypeScript", "CSS", "Node.js", "Next.js"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(post.category))
  )

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Search</h2>
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
        </aside>
        
        <main className="space-y-6">
          {filteredPosts.map(post => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <Badge>{post.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button variant="outline">Read More</Button>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">By {post.author}</p>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardFooter>
            </Card>
          ))}
          
          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No posts found.</p>
          )}
        </main>
      </div>
    </div>
  )
}