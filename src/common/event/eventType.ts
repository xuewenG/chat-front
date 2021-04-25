enum EVENT_TYPE {
  MOVE_WINDOW = 'MOVE_WINDOW',
}

interface EVENT_DATA {
  [EVENT_TYPE.MOVE_WINDOW]: {
    canMove: boolean
  }
}

export { EVENT_DATA, EVENT_TYPE }
