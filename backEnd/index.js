const PIPELINE = require("./PIPELINE.js");


require("dotenv").config();
const APIKEY = process.env.API_KEY;
const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const port = 3000;

const TYPE_JSON = "&type=json"

// cron으로 긁어와서 저장하면 된다.
//const toShow = await PIPELINE(APIKEY);

//const TEST_CALL ="http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc?inqryDiv=1&inqryBgnDt=201606010000&inqryEndDt=201606052359&pageNo=1&numOfRows=10";

// // index는 
// // 1.express만 require해서 클라이언트와 통신 
// // 2. Event 듣고 하위 모듈들의 메서드 콜.

/**
 * 💣 거의 100% 터지는 에러 (미리 알려줌)
items 구조 다름
👉 배열이 아니라 단일 객체로 올 수도 있음
ntceInsttNm 없음
👉 필드명 바뀌었을 가능성 있음
날짜 포맷 문제
👉 나라장터는 YYYYMMDDHHMM 요구
 * 
 */

app.use(cors());

let cache = null;
let lastFetch = 0;

app.get("/getAPI", async (req, res) => {
  const now = Date.now();

  if (cache && now - lastFetch < 60000) {
    return res.json(cache);
  }

  const result = await PIPELINE(APIKEY);

  cache = result;
  lastFetch = now;

  res.json(result);
});

const distPath = path.join(__dirname, "../frontEnd/dist");
app.use(express.static(distPath));

app.use((req,res)=>{

  res.sendFile(path.join(distPath, "index.html"));  
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

