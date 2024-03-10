# Jabez的後端學習旅程 Node.js lesson


##  Day 1
- writeFileSync('慾新增之檔名'，‘string| 任何內容’)
- terminal 開啟，引入
---

## Day 2
- 了解基本用法跟Module
- const server = http.createServer((req,res)=>{})
- req.url , req.method, req.header 去做請求
- res 去做回傳
- 如果req.url === "/xxx" 
```
 res.write("<html><body><h1>welcome nodejs</h1></body></html>")
```
- 得到form method="POST" 的值 ,先定義一個const body， req.on("data",(chunk)=>{ body.push(chunk)})
```
req.on('end',()=>{ const parsedBody=Buffer.concat(body).toString()}) 
//就能得到form POST傳給你的資料
```
```
res.end();  用於終止並發送響應並發送其到客戶端 沒有的話就沒辦法發送相應 所以一定要加
```
- # 以上是對express.js的基本邏輯架構