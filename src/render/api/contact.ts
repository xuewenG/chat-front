import { Contact } from '@common/entity/contact'
import { get } from '@render/util/request'

interface GetAllContactResp {
  code: string
  data: {
    contactList: Contact[]
  }
}

const getAllContact = (): Promise<GetAllContactResp> => {
  return get('/contact/getAllContact')
}

export { getAllContact }
