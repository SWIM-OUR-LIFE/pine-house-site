const {valid,json,github}=require('../../lib/shared');
module.exports=async function(req,res){
 if(req.method!=='POST') return json(res,405,{error:'허용되지 않은 요청입니다.'});
 if(!valid(req)) return json(res,401,{error:'로그인이 필요합니다.'});
 try{
  const {name,data}=req.body||{};
  if(typeof name!=='string'||typeof data!=='string'||!data.startsWith('data:image/')) return json(res,400,{error:'이미지 파일만 업로드할 수 있습니다.'});
  const match=data.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if(!match) return json(res,400,{error:'JPG, PNG, WEBP 형식만 지원합니다.'});
  const bytes=Buffer.from(match[2],'base64');
  if(bytes.length>4*1024*1024) return json(res,413,{error:'이미지 한 장은 4MB 이하로 줄여주세요.'});
  const ext=match[1]==='image/jpeg'?'jpg':match[1].split('/')[1];
  const safe=String(name).replace(/[^a-zA-Z0-9가-힣_-]/g,'-').slice(0,35)||'photo';
  const path=`uploads/${Date.now()}-${safe}.${ext}`;
  await github(path,'PUT',{message:`Add FINEHOUSE image ${safe}`,content:bytes.toString('base64')});
  return json(res,200,{url:`/${path}`,path});
 }catch(e){return json(res,500,{error:e.message});}
};
