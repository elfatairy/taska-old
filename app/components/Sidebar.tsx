export default function Sidebar() {
  return (
    <ul className="flex flex-col justify-center text-center min-w-[200px] py-4 bg-sidebar h-screen">
      <li className="py-2 px-4 cursor-pointer hover:bg-accent hover:text-accent-foreground aria-[current=page]:text-primary aria-[current=page]:bg-accent peer peer-hover:bg-transparent! rounded-md">Item 1</li>
      <li className="py-2 px-4 cursor-pointer hover:bg-accent hover:text-accent-foreground aria-[current=page]:text-primary aria-[current=page]:bg-accent peer peer-hover:bg-transparent! rounded-md">Item 2</li>
      <li className="py-2 px-4 cursor-pointer hover:bg-accent hover:text-accent-foreground aria-[current=page]:text-primary aria-[current=page]:bg-accent peer peer-hover:bg-transparent! rounded-md" aria-current="page">Item 4</li>
    </ul>
  )
}