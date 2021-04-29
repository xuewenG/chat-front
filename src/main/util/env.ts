const isDevelopment = process.env.NODE_ENV !== 'production'

const isTest = !!process.env.IS_TEST

const isDarwin = process.platform === 'darwin'

const isWin32 = process.platform === 'win32'

export { isDevelopment, isTest, isDarwin, isWin32 }
