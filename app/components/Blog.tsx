import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

interface Blog {
  _id: string;
  title: string;
  category: { _id: string; title: string } | string;
  createdAt: string;
  excerpt: string;
  user: { username: string };
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data);
          if (Array.isArray(data.blogs) && data.blogs.length > 0) {
            setBlogs(data.blogs);
            // Extract unique categories with explicit typing
            const uniqueCategories = Array.from(new Set(data.blogs.map((blog: Blog) => 
              typeof blog.category === 'object' ? blog.category.title : blog.category
            ))) as string[];
            setCategories(uniqueCategories);
          } else {
            console.error('No blogs found in the response');
          }
        } else {
          console.error('Failed to fetch blogs:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(
      typeof blog.category === 'object' ? blog.category.title : blog.category
    ))
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
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>
      
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
          {filteredPosts.map(blog => (
            <Card key={blog._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl">{blog.title}</CardTitle>
                  <Badge>{typeof blog.category === 'object' ? blog.category.title : blog.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                <Link href={`/${blog._id}/blog`} passHref>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">By {blog.user.username}</p>
                <p className="text-sm text-muted-foreground">{new Date(blog.createdAt).toLocaleDateString()}</p>
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