'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Category {
  _id: string;
  title: string;
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
}

export default function EditBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const blogId = params.id as string;

  useEffect(() => {
    fetchCategories();
    fetchBlogData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBlogData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/blogs/${blogId}`);
      if (response.ok) {
        const blogData = await response.json();
        console.log('Fetched blog data:', blogData);
        
        // Ensure we're accessing the correct properties
        setTitle(blogData.blog.title || '');
        setDescription(blogData.blog.description || '');
        setContent(blogData.blog.content || '');
        setCategory(blogData.blog.category || '');
        
        // Log the state after setting
        console.log('State after setting:', { title, description, content, category });
      } else {
        throw new Error('Failed to fetch blog data');
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setError('Failed to load blog data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
          category,
        }),
      });

      if (response.ok) {
        alert('Blog updated successfully!');
      } else {
        alert('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newCategory }),
      });

      if (response.ok) {
        const createdCategory = await response.json();
        setCategories([...categories, createdCategory]);
        setNewCategory('');
        setCategory(createdCategory._id); // Optionally select the newly created category
      } else {
        alert('Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Error creating category');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <div className="flex space-x-2">
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>{cat.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button type="button" onClick={handleCreateCategory}>Add Category</Button>
          </div>
        </div>
        <Button type="submit">Update Blog</Button>
      </form>
    </div>
  );
}