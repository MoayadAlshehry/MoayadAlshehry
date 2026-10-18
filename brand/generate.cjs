// Canonical v2 artwork. Original supplied PNG logos are embedded without alteration.
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const C={paper:'#F7F7F2',ink:'#17262D',teal:'#007F75',muted:'#4D6267',line:'#D8E2DD',tint:'#EAF2EE',mint:'#63C8BB'};
const base='https://github.com/MoayadAlshehry/';
const projects=[
 {id:'prexon',name:'PREXON',purpose:'Technical solutions. Practical delivery.',status:'Ongoing independent project',original:'prexon-official-original.png',url:base+'MoayadAlshehry/blob/main/case-studies/prexon.md',linkLabel:'Case study'},
 {id:'capstone',name:'Capstone Repository',purpose:'Academic review. Industry discovery.',status:'Four-person capstone team · Development ongoing',original:'capstone-primary-original.png',url:base+'MoayadAlshehry/blob/main/case-studies/capstone-repository.md',linkLabel:'Case study'},
 {id:'sodum',name:'SODUM',purpose:'From university to career readiness.',status:'Three-person venture · Pilot-ready MVP · Paused',original:'sodum-original.png',url:base+'MoayadAlshehry/blob/main/case-studies/sodum.md',linkLabel:'Case study'},
 {id:'autosemi',name:'AutoSemi',purpose:'Semicolon automation for VS Code.',status:'Published extension · 200+ Marketplace installs as of October 2026',url:base+'AutoSemi',linkLabel:'Source code'},
 {id:'sentinel',name:'Homelab Sentinel',purpose:'One view of homelab operations.',status:'Actively used on Raspberry Pi 5',url:base+'homelab-sentinel',linkLabel:'Source code'},
 {id:'database',name:'AI Database Builder',purpose:'From requirements to MySQL schemas.',status:'Java CLI · Review and approval before creation',url:base+'ai-database-builder',linkLabel:'Source code'},
 {id:'parser',name:'LLM Resume Parser',purpose:'From PDF resumes to structured JSON.',status:'Streamlit application · Configurable model endpoint',url:base+'llm-resume-parser',linkLabel:'Source code'},
 {id:'wol',name:'Wake-on-LAN API',purpose:'Private, repeatable remote wake-up.',status:'Raspberry Pi · Tailscale · Authenticated Flask API',url:base+'Wake-on-LAN-API',linkLabel:'Source code'}
];
for(const dir of ['sources','exports','logos','evidence'])fs.mkdirSync(path.join(root,dir),{recursive:true});
const names=new Set();
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function text(x,y,value,size=28,weight=400,color=C.ink,extra=''){return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" font-weight="'+weight+'" fill="'+color+'" '+extra+'>'+esc(value)+'</text>';}
function svg(w,h,title,body,bg=C.paper){return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img"><title>'+esc(title)+'</title>'+(bg?'<rect width="'+w+'" height="'+h+'" fill="'+bg+'"/>':'')+'<g font-family="Segoe UI, Arial, sans-serif">'+body+'</g></svg>';}
function save(name,source){names.add(name);fs.writeFileSync(path.join(root,'sources',name+'.svg'),source);}
function wrap(s,max){const lines=[];let line='';for(const word of s.split(' ')){if((line+' '+word).trim().length>max&&line){lines.push(line);line=word;}else line=(line+' '+word).trim();}if(line)lines.push(line);return lines;}
function original(file,x,y,w,h){return '<image x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,'+fs.readFileSync(path.join(root,'logos',file)).toString('base64')+'"/>';}
function drawing(id,variant='light'){
 const ink=variant==='dark'?C.paper:C.ink, accent=variant==='mono'?ink:variant==='dark'?C.mint:C.teal;
 const line=' fill="none" stroke="'+ink+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
 const teal=' fill="none" stroke="'+accent+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
 if(id==='personal')return '<path d="M9 50V15h9l14 19 14-19h9v35H45V33L32 51 19 33v17Z" fill="'+ink+'"/><path d="m24 51 8-14 8 14h-7l-1-3-1 3Z" fill="'+accent+'"/>';
 if(id==='autosemi')return '<path d="M10 18h23M10 29h23M10 40h15"'+line+'/><path d="M46 10v21M39 10h14M39 31h14M33 46l8 8 15-17"'+teal+'/>';
 if(id==='sentinel')return '<circle cx="31" cy="33" r="22"'+line+'/><path d="M31 33V11A22 22 0 0 1 53 33Z" fill="'+accent+'" opacity=".25"/><path d="m31 33 16-16"'+teal+'/><circle cx="31" cy="33" r="5" fill="'+accent+'"/><path d="M9 33h5M31 50v5M48 33h5M31 11v5"'+line+'/>';
 if(id==='database')return '<rect x="8" y="9" width="24" height="19" rx="4"'+line+'/><path d="M8 16h24M15 22h8"'+teal+'/><rect x="32" y="36" width="24" height="19" rx="4"'+line+'/><path d="M32 43h24M39 49h8M20 28v17h12"'+teal+'/>';
 if(id==='parser')return '<path d="M16 8h23l11 11v37H16Z M39 8v12h11"'+line+'/><rect x="23" y="29" width="5" height="5" rx="1" fill="'+accent+'"/><rect x="23" y="41" width="5" height="5" rx="1" fill="'+accent+'"/><path d="M34 31h9M34 43h9"'+teal+'/>';
 if(id==='wol')return '<path d="M20 17a21 21 0 1 0 24 0"'+line+'/><path d="M32 8v23M42 46h15l-6-6M57 46l-6 6"'+teal+'/>';
 throw new Error('Unknown mark '+id);
}
function mark(id,x,y,side,variant='light'){const p=projects.find(p=>p.id===id);return p?.original?original(p.original,x,y,side,side):'<svg x="'+x+'" y="'+y+'" width="'+side+'" height="'+side+'" viewBox="0 0 64 64">'+drawing(id,variant)+'</svg>';}
function accent(w,h){return '<path d="M'+(w-76)+' '+(h-112)+'l60-60v118l-60 60Z" fill="'+C.teal+'"/><path d="M'+(w-118)+' '+(h-14)+'v-157l134-134" fill="none" stroke="'+C.teal+'" stroke-width="2"/>';}
function cover(p,w,h,wide=false){
 let body='<rect x="76" y="64" width="42" height="5" fill="'+C.teal+'"/>';
 if(p.original){
   const pw=wide?760:1000, ph=wide?320:360, px=wide?76:76, py=wide?84:91;
   body+='<rect x="'+px+'" y="'+py+'" width="'+pw+'" height="'+ph+'" rx="18" fill="white" stroke="'+C.line+'"/>'+original(p.original,px+24,py+22,pw-48,ph-44);
   if(wide)wrap(p.purpose,30).forEach((line,i)=>body+=text(920,215+i*48,line,34,600));
   else body+=text(76,540,p.purpose,38,600);
 }else{
   const title=wide?[p.name]:p.id==='database'?['AI Database','Builder']:p.id==='parser'?['LLM Resume','Parser']:p.id==='sentinel'?['Homelab','Sentinel']:p.id==='wol'?['Wake-on-LAN','API']:[p.name];
   title.forEach((line,i)=>body+=text(72,(wide?178:192)+i*70,line,wide?66:64,700));
   const py=wide?290:title.length>1?365:310;
   wrap(p.purpose,wide?42:29).forEach((line,i)=>body+=text(76,py+i*46,line,wide?32:35,400,C.muted));
   const side=wide?264:324,x=wide?w-410:w-428,y=wide?84:94;
   body+='<rect x="'+x+'" y="'+y+'" width="'+side+'" height="'+side+'" rx="30" fill="'+C.tint+'" stroke="'+C.line+'"/>'+mark(p.id,x+side*.13,y+side*.13,side*.74);
 }
 body+=accent(w,h);
 return svg(w,h,p.name+' — '+p.purpose,body);
}
for(const id of ['personal','autosemi','sentinel','database','parser','wol']){
 for(const variant of ['light','dark','mono'])save('logo-'+id+'-'+variant,svg(1024,1024,id+' '+variant+' logo','<svg width="1024" height="1024" viewBox="0 0 64 64">'+drawing(id,variant)+'</svg>',null));
}
save('github-avatar',svg(1024,1024,'Moayad Alshehry — geometric MA monogram','<svg x="48" y="48" width="928" height="928" viewBox="0 0 64 64">'+drawing('personal')+'</svg>'));
save('autosemi-package-icon',svg(128,128,'AutoSemi extension icon','<rect width="128" height="128" rx="24" fill="'+C.paper+'"/><svg width="128" height="128" viewBox="0 0 64 64">'+drawing('autosemi')+'</svg>',null));
save('parser-page-icon',svg(256,256,'LLM Resume Parser icon','<svg width="256" height="256" viewBox="0 0 64 64">'+drawing('parser')+'</svg>'));
save('sentinel-favicon',svg(64,64,'Homelab Sentinel icon','<svg width="64" height="64" viewBox="0 0 64 64">'+drawing('sentinel')+'</svg>'));
save('sentinel-wordmark-dark',svg(820,160,'Homelab Sentinel',mark('sentinel',8,8,144,'dark')+text(176,102,'Homelab Sentinel',59,600,C.paper),null));
save('sentinel-wordmark',svg(820,160,'Homelab Sentinel','<rect width="820" height="160" rx="24" fill="'+C.paper+'"/>'+mark('sentinel',8,8,144)+text(176,102,'Homelab Sentinel',59,600),null));
for(const p of projects){
 save(p.id+'-linkedin',cover(p,1200,628));
 save(p.id+'-header',cover(p,1600,480,true));
 save(p.id+'-social',cover(p,1280,640));
 const side=p.original?480:160,w=p.original?640:160,h=p.original?240:160;
 save(p.id+'-mark',svg(w,h,p.name+' logo',p.original?original(p.original,8,8,w-16,h-16):mark(p.id,4,4,152)));
}
// GitHub-only logo tiles: transparent corners survive Markdown sanitization.
// Original supplied artwork stays intact on an opaque white inset.
for(const p of projects){
 const supplied=Boolean(p.original),w=supplied?960:192,h=supplied?420:192,r=supplied?60:42;
 const panel='<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="'+r+'" fill="'+(supplied?'#FFFFFF':C.paper)+'" stroke="'+C.line+'" stroke-width="2"/>';
 const artwork=supplied?original(p.original,64,48,w-128,h-96):mark(p.id,24,24,144);
 save(p.id+'-github-logo',svg(w,h,p.name+' — GitHub logo on a rounded contrast-safe tile',panel+artwork,null));
}
function header(w,h,linkedin){
 const x=linkedin?800:60;
 let body='<path d="M'+x+' 84l18-18v29l-18 18Z M'+(x+28)+' 66l18-18v29l-18 18Z" fill="'+C.teal+'"/>';
 body+=text(x-4,linkedin?220:210,'Moayad Alshehry',linkedin?70:78,700);
 body+=text(x,linkedin?302:282,'Business Development • Project Delivery',linkedin?34:38,linkedin?600:400);
 return svg(w,h,'Moayad Alshehry — Business Development & Project Delivery',body+accent(w,h));
}
save('professional-banner',header(1584,396,true));
save('github-header',header(1000,360,false));
// Clip both the paper field and the content, so the outer corners are transparent.
save('github-profile-header-rounded',svg(1000,360,'Moayad Alshehry — Business Development & Project Delivery','<defs><clipPath id="profile-header-clip"><rect width="1000" height="360" rx="32"/></clipPath></defs><g clip-path="url(#profile-header-clip)">'+header(1000,360,false)+'</g>',null));
for(const id of ['prexon','capstone','autosemi','sentinel'])save(id+'-featured',cover(projects.find(p=>p.id===id),1200,628));
let selected=text(72,158,'Selected Projects',66,700)+text(76,218,'Business needs. Practical delivery.',32,400,C.muted);
selected+='<rect x="76" y="292" width="310" height="164" rx="16" fill="white" stroke="'+C.line+'"/>'+original('prexon-official-original.png',94,307,274,134);
selected+='<rect x="416" y="292" width="370" height="164" rx="16" fill="white" stroke="'+C.line+'"/>'+original('capstone-primary-original.png',432,304,338,140);
selected+='<rect x="816" y="292" width="250" height="164" rx="16" fill="white" stroke="'+C.line+'"/>'+original('sodum-original.png',830,304,222,140);
['autosemi','sentinel','database','parser','wol'].forEach((id,i)=>selected+=mark(id,76+i*88,530,50));
save('selected-projects-featured',svg(1200,628,'Selected Projects — product discovery and delivery',selected+accent(1200,628)));
save('selected-projects-social',svg(1280,640,'Selected Projects — product discovery and delivery',selected+accent(1280,640)));
let course=text(76,105,'COMPLETED COURSEWORK',22,600,C.teal,'letter-spacing="2"')+text(72,207,'Decoding DevOps',64,700)+text(76,273,'Udemy • Imran Teli',32,600);
wrap('Infrastructure, automation and delivery workflows.',31).forEach((line,i)=>course+=text(76,370+i*44,line,34,400,C.muted));
course+='<path d="M910 166h144v194H910Z M930 145h144v194 M950 124h144v194" fill="none" stroke="'+C.teal+'" stroke-width="7" stroke-linejoin="round"/>';
save('devops-featured',svg(1200,628,'Decoding DevOps — completed coursework; course overview',course+accent(1200,628)));
function figure(p,title,subtitle,body){
 return svg(1600,900,p.name+' — '+title,text(76,98,title,54,700)+text(78,150,subtitle,25,400,C.muted)+body+text(78,852,p.status,24,400,C.muted));
}
function nodes(labels,planned=-1){
 const gap=30,w=(1440-gap*(labels.length-1))/labels.length,y=300,h=170;let out='';
 labels.forEach((lines,i)=>{const x=80+i*(w+gap);out+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="18" fill="'+(i===planned?'#FFFFFF':C.tint)+'" stroke="'+(i===planned?C.muted:C.teal)+'" stroke-width="2" '+(i===planned?'stroke-dasharray="10 8"':'')+'/>';
 lines.forEach((v,j)=>out+=text(x+w/2,y+65+j*42,v,30,j===0?600:400,j===0?C.ink:C.muted,'text-anchor="middle"'));
 if(i<labels.length-1)out+='<path d="M'+(x+w)+' '+(y+h/2)+'h'+gap+'" stroke="'+C.teal+'" stroke-width="3"/>';});
 return out;
}
const prexon=projects[0],capstone=projects[1],sodum=projects[2];
save('prexon-evidence',figure(prexon,'One delivered solution','Real estate and contract management • Example of PREXON technical delivery',nodes([['Properties'],['Contracts'],['Payments'],['Approvals']])+'<rect x="80" y="565" width="1440" height="112" rx="18" fill="'+C.ink+'"/>'+text(800,634,'Role-based access • Audit trails',36,600,C.paper,'text-anchor="middle"')));
save('capstone-evidence',figure(capstone,'Academic responsibilities and discovery','Designed workflow • Implementation ongoing',nodes([['Student','submission'],['Academic','supervision'],['Internal /','independent review'],['Faculty-led','publication'],['Controlled','industry access']])+'<rect x="80" y="565" width="1440" height="112" rx="18" fill="'+C.ink+'"/>'+text(800,634,'Student attribution • Institutional boundaries',36,600,C.paper,'text-anchor="middle"')));
save('sodum-evidence',figure(sodum,'From discovery to a pilot-ready MVP','Three-person venture • Paused before user rollout',nodes([['Product','discovery'],['Requirements &','delivery planning'],['Multi-portal','MVP'],['University pilot','Planned']],3)+text(80,607,'A two-university pilot approach was prepared; user rollout did not begin.',30,400,C.muted)));
const auto=projects.find(p=>p.id==='autosemi');
let code='<rect x="80" y="255" width="680" height="290" rx="20" fill="'+C.ink+'"/><rect x="840" y="255" width="680" height="290" rx="20" fill="'+C.ink+'"/>';
code+=text(112,310,'BEFORE ENTER',22,600,C.mint)+text(872,310,'AFTER ENTER',22,600,C.mint);
code+=text(112,414,'const project = "AutoSemi"',31,400,C.paper,'font-family="Consolas, monospace"')+text(872,414,'const project = "AutoSemi";',31,400,C.paper,'font-family="Consolas, monospace"');
code+=text(80,636,'Editing example from the current repository. Review automated edits.',30,400,C.muted);
save('autosemi-evidence',figure(auto,'A routine statement, completed','Illustrative code example • Current repository behavior',code));
const db=projects.find(p=>p.id==='database');
const raw=fs.readFileSync(path.join(root,'evidence/database-offline-example.txt'),'utf8').replace(/^\uFEFF/,'').trim();
let sql='<rect x="80" y="220" width="1440" height="390" rx="20" fill="'+C.ink+'"/>';
let lines=raw.split(/\r?\n/).flatMap(line=>line?wrap(line,84):['']);
lines.forEach((line,i)=>sql+=text(112,278+i*43,line,25,400,C.paper,'font-family="Consolas, monospace"'));
sql+=text(80,690,'Offline preview output • No database connection or model request',30,400,C.muted);
save('database-evidence',figure(db,'Requirements become reviewable SQL','Actual output from the bundled offline example',sql));
save('wol-evidence',figure(projects.find(p=>p.id==='wol'),'A private remote-wake workflow','Documented request path • No real PC was contacted for this visual',nodes([['iPhone /','HTTP client'],['Tailscale','private route'],['Authenticated','POST /wol'],['Checked','wake command'],['Target PC','wake packet']])+text(80,610,'Command success confirms packet dispatch. Startup depends on the target setup.',30,400,C.muted)));
for(const id of ['sentinel','parser']){
 const p=projects.find(p=>p.id===id);
 let body='<rect x="76" y="200" width="1448" height="570" rx="14" fill="white" stroke="'+C.line+'"/>'+original('../evidence/'+id+'-ui.png',90,210,1420,550);
 save(id+'-evidence',figure(p,id==='sentinel'?'Infrastructure operations in one view':'Structured resume data you can inspect','Actual interface • Fictional demonstration data',body));
}
for(const file of fs.readdirSync(path.join(root,'sources'))){
 const stem=path.basename(file,'.svg');
 if(file.endsWith('.svg')&&!names.has(stem)){fs.unlinkSync(path.join(root,'sources',file));const png=path.join(root,'exports',stem+'.png');if(fs.existsSync(png))fs.unlinkSync(png);}
}
fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify({generation:'v2',palette:C,font:'Segoe UI',projects,assets:[]},null,2)+'\n');
console.log('Generated '+names.size+' editable v2 compositions.');
require('./render.cjs');
