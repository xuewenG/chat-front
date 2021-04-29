enum EVENT_TYPE {
  MOVE_WINDOW = 'MOVE_WINDOW',
  CLOSE_WINDOW = 'CLOSE_WINDOW',
  HIDE_WINDOW = 'HIDE_WINDOW',
}

interface EVENT_DATA {
  [EVENT_TYPE.MOVE_WINDOW]: {
    canMove: boolean
  }
  [EVENT_TYPE.CLOSE_WINDOW]: Record<string, never>
  [EVENT_TYPE.HIDE_WINDOW]: Record<string, never>
}

export { EVENT_DATA, EVENT_TYPE }
