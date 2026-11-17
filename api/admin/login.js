const {makeToken,cookie,json}=require('../../lib/shared');
module.exports=async function(req,res){
 if(req.method!=='POST') return json(res,405,{error:'허용되지 않은 요청입니다.'});
 const {username,password}=req.body||{};
 if(!process.env.ADMIN_ID || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return json(res,500,{error:'Vercel 환경변수 설정이 필요합니다.'});
 const ok=typeof username==='string' && typeof password==='string' && username===process.env.ADMIN_ID && password===process.env.ADMIN_PASSWORD;
 if(!ok) return json(res,401,{error:'아이디 또는 비밀번호가 올바르지 않습니다.'});
 res.setHeader('Set-Cookie',cookie(makeToken(),7*24*60*60));
 return json(res,200,{ok:true});
};
