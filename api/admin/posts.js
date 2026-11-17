const {valid,json,github}=require('../../lib/shared');
const PATH='content/posts.json';
module.exports=async function(req,res){
 try{
  if(req.method==='GET'){
   const r=await github(PATH); const text=Buffer.from(r.content,'base64').toString('utf8');
   return json(res,200,JSON.parse(text));
  }
  if(!valid(req)) return json(res,401,{error:'로그인이 필요합니다.'});
  if(req.method==='PUT'){
   const posts=req.body?.posts;
   if(!Array.isArray(posts)) return json(res,400,{error:'게시글 형식이 올바르지 않습니다.'});
   const old=await github(PATH); const content=Buffer.from(JSON.stringify(posts,null,2),'utf8').toString('base64');
   await github(PATH,'PUT',{message:'Update FINEHOUSE field posts',content,sha:old.sha});
   return json(res,200,{ok:true});
  }
  return json(res,405,{error:'허용되지 않은 요청입니다.'});
 }catch(e){return json(res,500,{error:e.message});}
};
