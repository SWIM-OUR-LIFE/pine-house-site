const {cookie,json}=require('../../lib/shared');
module.exports=async function(req,res){res.setHeader('Set-Cookie',cookie('',0));return json(res,200,{ok:true});};
