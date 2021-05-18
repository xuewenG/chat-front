interface Contact {
  id: number
  userId: number
  contactId: number
  contactType: number
  state: number
  lastMessageId: number

  account: string
  nickname: string
  avatar: string
  newMessageCount: number
}

export { Contact }
