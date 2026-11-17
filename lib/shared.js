const crypto = require('crypto');
const COOKIE = 'fh_admin_session';
function secret(){ return process.env.ADMIN_SESSION_SECRET || ''; }
function sign(value){ return crypto.createHmac('sha256', secret()).update(value).digest('base64url'); }
function makeToken(){
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 7*24*60*60*1000, ok: true })).toString('base64url');
  return payload + '.' + sign(payload);
}
function valid(req){
  if (!secret()) return false;
  const raw = (req.headers.cookie || '').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='));
  if (!raw) return false;
  const token = decodeURIComponent(raw.slice(COOKIE.length+1));
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a,b)) return false;
  try { const data=JSON.parse(Buffer.from(payload,'base64url').toString()); return data.ok && data.exp>Date.now(); } catch { return false; }
}
function cookie(value, maxAge){ return `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`; }
function json(res,status,data){ res.status(status).setHeader('Content-Type','application/json; charset=utf-8').send(JSON.stringify(data)); }
async function github(path, method='GET', body){
  const token=process.env.GITHUB_CONTENT_TOKEN, repo=process.env.GITHUB_REPOSITORY;
  if(!token || !repo) throw new Error('GitHub 환경변수가 설정되지 않았습니다.');
  const url=`https://api.github.com/repos/${repo}/contents/${path}`;
  const r=await fetch(url,{method,headers:{Authorization:`Bearer ${token}`,'X-GitHub-Api-Version':'2022-11-28',Accept:'application/vnd.github+json','Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
  const data=await r.json();
  if(!r.ok) throw new Error(data.message || `GitHub 오류 (${r.status})`);
  return data;
}
module.exports={valid,makeToken,cookie,json,github};
