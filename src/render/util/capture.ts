const setStreamToVideo = (selector: string, stream: MediaStream) => {
  const video: HTMLVideoElement | null = document.querySelector(selector)
  if (!video) {
    console.error('no video dom!')
    return
  }
  video.srcObject = stream
  video.onloadedmetadata = () => video.play()
}

const getScreenStream = async (): Promise<MediaStream | null> => {
  const sources = await desktopCapturer.getSources({ types: ['screen'] })
  if (!sources.length) {
    return null
  }
  const source = sources[0]
  const c: any = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
      },
    },
  }
  return navigator.mediaDevices.getUserMedia(c)
}

export { setStreamToVideo, getScreenStream }
