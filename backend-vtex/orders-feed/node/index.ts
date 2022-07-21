import type { ClientsConfig, ServiceContext, EventContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { bonus } from './middlewares/bonus'
import { bonusAll } from './middlewares/bonusAll'
import { bonusPatch } from './middlewares/bonusPatch'
import { bonusPost } from './middlewares/bonusPost'
import { someStates } from './middlewares/someStates'

const TIMEOUT_MS = 800

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
  interface BonusData {
    email: string
    points: number

  }
  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }
}
export default new Service({
  clients,
  routes: {
    bonusOne: method({
      GET: [bonus],
    }),
    bonusAll: method({
      GET: [bonusAll],
    }),
    bonusPatch: method({
      PATCH: [bonusPatch],
    }),
    bonusPost: method({
      POST: [bonusPost],
    }),
  },
  events: {
    someStates,
  },
})
