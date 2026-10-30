export const specs={gad7:{count:7,maxItem:3,max:21},phq9:{count:9,maxItem:3,max:27}};
export function score(id,answers){
 const s=specs[id]; if(!s||!Array.isArray(answers)||answers.length!==s.count||Array.from(answers).some(n=>!Number.isInteger(n)||n<0||n>s.maxItem))throw new Error('Please answer every question.');
 const raw=answers.reduce((a,b)=>a+b,0),total=raw;
 const band=id==='gad7'?(total<5?0:total<10?1:total<15?2:3):(total<5?0:total<10?1:total<15?2:total<20?3:4);
 return {raw,total,max:s.max,band,safety:id==='phq9'&&answers[8]>0};
}
