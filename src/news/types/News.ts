export default interface News {
  id: string
  title: string
  summary: string
  content: string
  images: string[]
  date: string
  presenters: string[]
  details?: string
  tags?: string[]
  // Optional: team members (students) for this news item
  members?: string[]
}
