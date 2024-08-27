import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThumbsUp } from "lucide-react"

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    description: string;
    likes: number;
    // Add other properties as needed
  }
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">{blog.title}</h3>
        <p className="text-sm text-gray-500 mt-2">{blog.description}</p>
      </CardHeader>
      <CardContent>
        {/* Add any other content you want to display */}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`/blog/${blog._id}`}>
          <Button>Read More</Button>
        </Link>
        <div className="flex items-center">
          <ThumbsUp className="w-4 h-4 mr-2" />
          <span>{blog.likes}</span>
        </div>
      </CardFooter>
    </Card>
  )
}