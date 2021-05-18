interface Message {
  id: number
  fromId: number
  toId: number
  contactType: number
  type: number
  content: string
  time: Date
}

export { Message }
