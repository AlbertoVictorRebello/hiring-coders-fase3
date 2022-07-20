import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Bonus extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://bocjgf0d3h.execute-api.us-east-1.amazonaws.com/v1/saldo', context, {
      ...options,
      headers: {
        ...(options && options.headers),
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVmRjk1ZFoyZFZid2lHYUZGNWp2NiJ9.eyJpc3MiOiJodHRwczovL2Rldi11a2NjZ3JyYS51cy5hdXRoMC5jb20vIiwic3ViIjoibmZKWnllb2p2VWF3Q01VWDVob0hseDBNa2NrVWg5TWxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXV0aDAtaGMzZjNhd3Mtand0LWF1dGhvcml6ZXIiLCJpYXQiOjE2NTgyODk1MjksImV4cCI6MTY2MDc4OTUyOSwiYXpwIjoibmZKWnllb2p2VWF3Q01VWDVob0hseDBNa2NrVWg5TWwiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.D80f_L2mYZ4ezCgwkN1se0DT_W1RPZvdn-sWJg4r59EYgy3kLDONu1nX0LCMgaKcMJB6H0boxz4OOYg9eilLoLRZl2YJ-wZE7Onp8fXPIkKEKXdUrXN3jyA33usAebQdi32oPU2oGRFV4XMglnE6xfcMCAl22YlaF4g3v_RtYuQmYmP16OkGxz8LiapvzKDQGAmDHCvs-BOH49xYwGf_0SJoWKDM7mAfTtP4DZUfTxvHPg1lrpwR1k-YK5furuPvjCMza-wOjBfXaL0-mlYFb0ZoPEnoUKzHzZEj018JBf4LHt6HqI9uqIswZPyl-z2jq2N5-5J6lXP2c1l5d7cSIA',
        VtexIdClientAutCookie: context.authToken,
      },
    })
  }

  public async getBonus(bonus: string): Promise<string> {
    return this.http.get(bonus, {
      metric: 'bonus-get',
    })
  }

  public async getPost(bonus: string, data: BonusData): Promise<string> {
    return this.http.post(bonus, data,{
      metric: 'bonus-get',
    })
  }
  public async getBonusAll(bonus: string): Promise<string> {
    return this.http.get(bonus, {
      metric: 'bonus-get',
    })
  }


  public async getBonusWithHeaders(
    bonus: string
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(bonus, {
      metric: 'bonus-get-raw',
    })
  }
}
