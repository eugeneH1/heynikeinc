// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/lMyDdWaBdGY
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
// import Link from "next/link"
// import { Input } from "@/components/ui/input"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

// export default function BlogOne() {
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//         <Breadcrumb className="hidden md:flex">
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link href="#" prefetch={false}>
//                   Dashboard
//                 </Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Audit Team</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <div className="relative ml-auto flex-1 md:grow-0">
//           <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
//           />
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
//               <img
//                 src="/placeholder.svg"
//                 width={36}
//                 height={36}
//                 alt="Avatar"
//                 className="overflow-hidden rounded-full"
//                 style={{ aspectRatio: "36/36", objectFit: "cover" }}
//               />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem>Support</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Logout</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </header>
//       <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
//         <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>External News Updates</CardTitle>
//               <CardDescription>
//                 Stay informed about the latest news and events that may impact your company.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4">
//                 <div className="grid gap-2 rounded-lg border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm font-medium">New Regulations Announced</div>
//                     <Badge variant="outline" className="text-xs">
//                       Relevant
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     The government has introduced new regulations that will impact the banking industry. Our compliance
//                     team is reviewing the changes and preparing a response.
//                   </p>
//                 </div>
//                 <div className="grid gap-2 rounded-lg border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm font-medium">Cybersecurity Breach at Competitor</div>
//                     <Badge variant="outline" className="text-xs">
//                       Relevant
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     A major competitor in the banking industry has reported a cybersecurity breach, leading to the
//                     exposure of customer data. Our IT security team is reviewing our own systems to ensure we are
//                     prepared for similar attacks.
//                   </p>
//                 </div>
//                 <div className="grid gap-2 rounded-lg border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm font-medium">Economic Outlook Report</div>
//                     <Badge variant="outline" className="text-xs">
//                       Relevant
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     The latest economic outlook report suggests a potential recession in the coming year. Our risk
//                     management team is analyzing the potential impact on our business and preparing contingency plans.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Internal Company News</CardTitle>
//               <CardDescription>
//                 Stay up-to-date with the latest news and updates from across the organization.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4">
//                 <div className="grid gap-2 rounded-lg border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm font-medium">New Compliance Training</div>
//                     <Badge variant="secondary" className="text-xs">
//                       Compliance
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     The compliance team has announced a new mandatory training program for all employees to ensure we
//                     are up-to-date with the latest regulations and best practices.
//                   </p>
//                 </div>
//                 <div className="grid gap-2 rounded-lg border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm font-medium">Audit Team Expansion</div>
//                     <Badge variant="secondary" className="text-xs">
//                       Audit
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     The audit team is expanding to meet the growing demands of the business. We are currently hiring for
//                     several new positions, including senior auditors and data analysts.
//                   </p>
//                 </div>
//                 <div className="grid gap-2 rounded-lg border p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm font-medium">New Risk Management Software</div>
//                     <Badge variant="secondary" className="text-xs">
//                       Risk
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     The risk management team has implemented a new software platform to improve our ability to identify,
//                     assess, and mitigate potential risks. All employees are encouraged to familiarize themselves with
//                     the new system.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <div>
//           <Card className="overflow-hidden">
//             <CardHeader className="flex flex-row items-start bg-muted/50">
//               <div className="grid gap-0.5">
//                 <CardTitle className="group flex items-center gap-2 text-lg">
//                   Audit Report: Q2 2023
//                   <Button
//                     size="icon"
//                     variant="outline"
//                     className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
//                   >
//                     <div className="h-3 w-3" />
//                     <span className="sr-only">Copy Report ID</span>
//                   </Button>
//                 </CardTitle>
//                 <CardDescription>Date: June 30, 2023</CardDescription>
//               </div>
//               <div className="ml-auto flex items-center gap-1">
//                 <Button size="sm" variant="outline" className="h-8 gap-1">
//                   <div className="h-3.5 w-3.5" />
//                   <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Download Report</span>
//                 </Button>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button size="icon" variant="outline" className="h-8 w-8">
//                       <div className="h-3.5 w-3.5" />
//                       <span className="sr-only">More</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem>Share</DropdownMenuItem>
//                     <DropdownMenuItem>Print</DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem>Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </CardHeader>
//             <CardContent className="p-6 text-sm">
//               <div className="grid gap-3">
//                 <div className="font-semibold">Audit Findings</div>
//                 <ul className="grid gap-3">
//                   <li className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Compliance with new regulations</span>
//                     <Badge variant="secondary" className="text-xs">
//                       Passed
//                     </Badge>
//                   </li>
//                   <li className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Cybersecurity controls</span>
//                     <Badge variant="outline" className="text-xs">
//                       Needs Improvement
//                     </Badge>
//                   </li>
//                   <li className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Risk management processes</span>
//                     <Badge variant="secondary" className="text-xs">
//                       Passed
//                     </Badge>
//                   </li>
//                   <li className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Internal controls</span>
//                     <Badge variant="secondary" className="text-xs">
//                       Passed
//                     </Badge>
//                   </li>
//                 </ul>
//                 <Separator className="my-4" />
//                 <div className="grid gap-3">
//                   <div className="font-semibold">Recommendations</div>
//                   <ul className="grid gap-3">
//                     <li className="flex items-start justify-between">
//                       <div className="text-muted-foreground">
//                         Implement additional cybersecurity measures to address identified vulnerabilities.
//                       </div>
//                       <div className="ml-4 flex-shrink-0 text-muted-foreground">High Priority</div>
//                     </li>
//                     <li className="flex items-start justify-between">
//                       <div className="text-muted-foreground">
//                         Review and update risk management policies and procedures.
//                       </div>
//                       <div className="ml-4 flex-shrink-0 text-muted-foreground">Medium Priority</div>
//                     </li>
//                     <li className="flex items-start justify-between">
//                       <div className="text-muted-foreground">
//                         Provide additional compliance training for all employees.
//                       </div>
//                       <div className="ml-4 flex-shrink-0 text-muted-foreground">Low Priority</div>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
//               <div className="text-xs text-muted-foreground">
//                 Updated <time dateTime="2023-06-30">June 30, 2023</time>
//               </div>
//               <Pagination className="ml-auto mr-0 w-auto">
//                 <PaginationContent>
//                   <PaginationItem>
//                     <Button size="icon" variant="outline" className="h-6 w-6">
//                       <div className="h-3.5 w-3.5" />
//                       <span className="sr-only">Previous Report</span>
//                     </Button>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <Button size="icon" variant="outline" className="h-6 w-6">
//                       <div className="h-3.5 w-3.5" />
//                       <span className="sr-only">Next Report</span>
//                     </Button>
//                   </PaginationItem>
//                 </PaginationContent>
//               </Pagination>
//             </CardFooter>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }