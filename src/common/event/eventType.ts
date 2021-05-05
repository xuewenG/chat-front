enum EVENT_TYPE {
  MOVE_WINDOW = 'MOVE_WINDOW',
  CLOSE_WINDOW = 'CLOSE_WINDOW',
  HIDE_WINDOW = 'HIDE_WINDOW',
  OPEN_REGISTER_WINDOW = 'OPEN_REGISTER_WINDOW',
  COPY_TEXT = 'COPY_TEXT',
}

interface EVENT_DATA {
  [EVENT_TYPE.MOVE_WINDOW]: {
    canMove: boolean
  }
  [EVENT_TYPE.CLOSE_WINDOW]: Record<string, never>
  [EVENT_TYPE.HIDE_WINDOW]: Record<string, never>
  [EVENT_TYPE.OPEN_REGISTER_WINDOW]: Record<string, never>
  [EVENT_TYPE.COPY_TEXT]: {
    text: string
  }
}

export { EVENT_DATA, EVENT_TYPE }
