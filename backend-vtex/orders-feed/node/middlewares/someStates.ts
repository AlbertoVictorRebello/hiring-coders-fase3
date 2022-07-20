import axios from 'axios'

export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const orderId = ctx.body.orderId
  const orderBody = await ctx.clients.order.order(orderId)

  const profileId = orderBody.clientProfileData.userProfileId
  const userEmail = (await ctx.clients.profile.getEmail(profileId)).email
  const source = ctx.vtex.workspace !== "master" ? `${ctx.vtex.workspace}--${ctx.vtex.account}` : ctx.vtex.account
  axios
    .get(
      `http://${source}.myvtex.com/_v/bonus/`,
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        data: {
          email: `${userEmail}`
        }
      }
    )
    .then((response) => {
      if (typeof response.data.Item === 'undefined') {
        axios
          .post(`http://${source}.myvtex.com/_v/bonus/new`, {
            email: userEmail,
            saldo: orderBody.value / 100,
          })
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.info(err)
          })
      } else {
        axios
          .patch(
            `https://bocjgf0d3h.execute-api.us-east-1.amazonaws.com/v1/saldo/${userEmail}`,{
              email: userEmail,
              points: orderBody.value / 100,
            },
            {
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'X-VTEX-Use-Https': 'true',
                'Proxy-Authorization': 'ctx.authToken',
              }
            }
          )
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.info(err)
          })
      }
    })

  await next()
}
