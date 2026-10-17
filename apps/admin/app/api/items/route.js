import {cookies} from 'next/headers';

export const dynamic='force-dynamic';

async function proxy(request){
 if(cookies().get('ship_demo')?.value!=='member')return Response.json({error:'sign in required'},{status:401});

 try{const r=await fetch((process.env.API_URL||'http://api:8080')+'/items',{method:request.method,headers:{'content-type':'application/json'},body:request.method==='POST'?await request.text():undefined,cache:'no-store'});
return new Response(await r.text(),{status:r.status,headers:{'content-type':'application/json'}})}catch(e){return Response.json({error:'API unavailable: '+e.message},{status:502})}
}export const GET=proxy;
export const POST=proxy;

