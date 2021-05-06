enum EVENT_TYPE {
  MOVE_WINDOW = 'MOVE_WINDOW',
  CLOSE_WINDOW = 'CLOSE_WINDOW',
  HIDE_WINDOW = 'HIDE_WINDOW',
  OPEN_REGISTER_WINDOW = 'OPEN_REGISTER_WINDOW',
  COPY_TEXT = 'COPY_TEXT',
  INIT_WEB_SOCKET = 'INIT_WEB_SOCKET',
  SEND_SOCKET_MESSAGE = 'SEND_SOCKET_MESSAGE',
  OPEN_MAIN_WINDOW = 'OPEN_MAIN_WINDOW',
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
  [EVENT_TYPE.INIT_WEB_SOCKET]: {
    token: string
  }
  [EVENT_TYPE.SEND_SOCKET_MESSAGE]: {
    type: number
    data: string
  }
  [EVENT_TYPE.OPEN_MAIN_WINDOW]: Record<string, never>
}

export { EVENT_DATA, EVENT_TYPE }
