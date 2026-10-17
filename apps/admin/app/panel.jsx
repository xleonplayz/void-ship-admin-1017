 'use client';

import {useState} from 'react';

export default function Panel(){
 const [rows,setRows]=useState([]),[status,setStatus]=useState('Signed out');

 async function call(path,options){const r=await fetch(path,options);
let b;
try{b=await r.json()}catch{throw new Error('Non-JSON upstream response: '+r.status)}if(!r.ok)throw new Error(b.error||'HTTP '+r.status);
return b;
}
 async function login(){try{await call('/api/login',{method:'POST'});
setStatus('Signed in');
await refresh()}catch(e){setStatus(e.message)}}
 async function refresh(){try{const b=await call('/api/items');
setRows(b.items||[]);
setStatus('Loaded '+b.items.length+' items')}catch(e){setStatus(e.message)}}
 async function create(e){e.preventDefault();
try{await call('/api/items',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:new FormData(e.currentTarget).get('name')})});
await refresh()}catch(e){setStatus(e.message)}}
 return <><button id="login" onClick={login}>Sign in to demo</button><button id="refresh" onClick={refresh}>Refresh</button><p id="status">{status}</p><form onSubmit={create}><label>Item name <input name="name" defaultValue="Meadow basket" required/></label><button id="create">Create item</button></form><table><thead><tr><th>ID</th><th>Name</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.status}</td></tr>)}</tbody></table></>;

}