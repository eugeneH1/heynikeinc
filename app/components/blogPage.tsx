// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Heart } from "lucide-react"

// export default function Component() {
//   const [likes, setLikes] = useState(0)
//   const [comments, setComments] = useState([
//     { id: 1, author: 'John Doe', content: 'Great article! Very informative.' },
//     { id: 2, author: 'Jane Smith', content: 'I learned a lot from this. Thanks for sharing!' }
//   ])
//   const [newComment, setNewComment] = useState('')
//   const [commentAuthor, setCommentAuthor] = useState('')

//   const handleLike = () => {
//     setLikes(likes + 1)
//   }

//   const handleCommentSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (newComment.trim() && commentAuthor.trim()) {
//       setComments([
//         ...comments,
//         { id: comments.length + 1, author: commentAuthor, content: newComment }
//       ])
//       setNewComment('')
//       setCommentAuthor('')
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-8">
//       <article className="prose dark:prose-invert lg:prose-xl">
//         <h1 className="text-3xl font-bold">The Future of Artificial Intelligence</h1>
//         <p className="text-xl text-muted-foreground">Exploring the potential impact of AI on various industries and our daily lives.</p>
//         <div className="mt-4">
//           <p>Artificial Intelligence (AI) is rapidly evolving and its influence is being felt across numerous sectors. From healthcare to finance, transportation to entertainment, AI is revolutionizing the way we live and work.</p>
//           <p>In this article, we'll delve into the current state of AI technology, its potential future developments, and the ethical considerations we must address as we move forward in this exciting field.</p>
//           {/* Add more paragraphs as needed */}
//         </div>
//       </article>

//       <div className="flex items-center space-x-2">
//         <Button variant="outline" size="sm" onClick={handleLike}>
//           <Heart className="mr-2 h-4 w-4" />
//           Like
//         </Button>
//         <span className="text-sm text-muted-foreground">{likes} likes</span>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold">Comments</h2>
//         <form onSubmit={handleCommentSubmit} className="space-y-2">
//           <Input
//             placeholder="Your name"
//             value={commentAuthor}
//             onChange={(e) => setCommentAuthor(e.target.value)}
//           />
//           <Textarea
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//           <Button type="submit">Post Comment</Button>
//         </form>
//         <div className="space-y-4">
//           {comments.map((comment) => (
//             <div key={comment.id} className="flex space-x-4 items-start">
//               <Avatar>
//                 <AvatarFallback>{comment.author[0]}</AvatarFallback>
//               </Avatar>
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">{comment.author}</p>
//                 <p className="text-sm text-muted-foreground">{comment.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }