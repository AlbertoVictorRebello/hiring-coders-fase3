export async function bonusAll(ctx: Context, next: () => Promise<any>) {

  ctx.set('Cache-Control','no-cache, no-store, must-revalidate');
  ctx.set('X-VTEX-Use-Https','true')
  ctx.set('Proxy-Authorization','ctx.authToken')

  const res = await ctx.clients.bonus.getBonusAll('').catch((reason)=>{
    return reason?.response?.data
  })


  ctx.body = res;

  await next()
}
