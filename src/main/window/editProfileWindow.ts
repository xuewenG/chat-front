import { WINDOW_NAME } from '@common/window/windowName'
import { createWindow, getWindowByName } from '.'

const createEditProfileWindow = () => {
  const mainWindow = getWindowByName(WINDOW_NAME.MAIN_WINDOW)
  createWindow(WINDOW_NAME.EDIT_PROFILE_WINDOW, '/edit', {
    width: 500,
    height: 500,
    parent: mainWindow,
  })
}

export { createEditProfileWindow }
