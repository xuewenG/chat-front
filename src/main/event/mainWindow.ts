import { EVENT_TYPE } from '@common/event/eventType'
import { createAddFriendWindow } from '@main/window/addFriendWindow'
import { createEditProfileWindow } from '@main/window/editProfileWindow'
import { createScreenShareWindow } from '@main/window/screenShareWindow'
import { ipcMain } from 'electron'

const useOpenScreenShareWindow = () => {
  ipcMain.on(EVENT_TYPE.OPEN_SCREEN_SHARE_WINDOW, () => {
    createScreenShareWindow()
  })
}

const useOpenEditProfileWindow = () => {
  ipcMain.on(EVENT_TYPE.OPEN_EDIT_PROFILE_WINDOW, () => {
    createEditProfileWindow()
  })
}

const useAddFriendWindow = () => {
  ipcMain.on(EVENT_TYPE.OPEN_ADD_FRIEND_WINDOW, () => {
    createAddFriendWindow()
  })
}

export {
  useOpenScreenShareWindow,
  useOpenEditProfileWindow,
  useAddFriendWindow,
}
