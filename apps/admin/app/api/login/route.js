export async function POST(){
return Response.json({ok:true},{headers:{'set-cookie':'ship_demo=member; HttpOnly; SameSite=Lax; Secure; Path=/'}});
}
