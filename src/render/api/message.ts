import { ContactMessage } from '@render/store'
import { get } from '@render/util/request'

interface GetAllMessageResp {
  code: string
  data: {
    contactMessageList: ContactMessage[]
  }
}

const getAllMessage = (): Promise<GetAllMessageResp> => {
  return get('/message/getAllMessage')
}

export { getAllMessage }
