import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

const installDevTool = async (): Promise<void> => {
  try {
    await installExtension(VUEJS3_DEVTOOLS)
  } catch (e) {
    console.error('Vue Devtools failed to install:', e.toString())
  }
}

export { installDevTool }
