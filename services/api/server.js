import http from 'node:http';
const items=[{id:'i-1',name:'Autumn basket',status:'ready'},{id:'i-2',name:'Orchard crate',status:'packing'}];
http.createServer(async(req,res)=>{let code=200;let body;
 if(req.url==='/health')body={ok:true,service:'admin-api'};
 else if(req.url==='/items'&&req.method==='GET')body={items};
 else if(req.url==='/items'&&req.method==='POST'){try{let s='';for await(const c of req)s+=c;const b=JSON.parse(s);if(typeof b.name!=='string'||!b.name.trim())throw Error('name required');const item={id:'i-'+(items.length+1),name:b.name,status:'new'};items.push(item);code=201;body=item}catch(e){code=400;body={error:e.message}}}
 else{code=404;body={error:'not found'}}
 console.info('admin-api',req.method,req.url,code);res.writeHead(code,{'content-type':'application/json'});res.end(JSON.stringify(body));}).listen(Number(process.env.PORT||8080),'0.0.0.0');
