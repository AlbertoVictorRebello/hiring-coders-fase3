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
      `http://${source}.myvtex.com/_v/bonus/${userEmail}`,
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    )
    .then((response) => {
      if (typeof response.data?.Item === 'undefined') {
        axios
          .post(`http://${source}.myvtex.com/_v/bonus/new`, {
            email: userEmail,
            saldo: Math.floor(orderBody.value / 100),
          })
          .then((_) => {
          })
          .catch((__) => {
          })
      } else {
        axios
          .patch(`http://${source}.myvtex.com/_v/bonus/patch`, {
            email: userEmail,
            pontos: Math.floor(orderBody.value / 100),
          })
          .then((_) => {
          })
          .catch((__) => {
          })
      }
    })

  await next()
}
