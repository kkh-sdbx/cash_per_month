const EVENT_TARGETS = require("./EVENT_TARGETS.js");
const CALLAPI = require("./API_CALLER.js");

require("dotenv").config();
const APIKEY = process.env.API_KEY;
const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const port = 3000;

const CALLER = CALLAPI();

const TEST_CALL ="http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc?inqryDiv=1&inqryBgnDt=201606010000&inqryEndDt=201606052359&pageNo=1&numOfRows=10&ServiceKey=";

// // index는 
// // 1.express만 require해서 클라이언트와 통신 
// // 2. Event 듣고 하위 모듈들의 메서드 콜.

let testResult = CALLER.testCall(APIKEY);

app.use(cors());

app.get("/justGet",async (req, res) => {
    try {
        const response = await testResult;
        res.json(response);
    } catch (error) {
        console.error("something is wrong!",error);
        res.status(500).json({"success":false, "message":error});
    }
});

app.get("/getAPI",async (req, res) => {
    try {
        const response = await axios.get(TEST_CALL + KEY + TYPE_JSON);
        res.json({"data": response.data });
    } catch (error) {
        res.status(500).send('Error fetching data from GitHub API');
    }
    
});

const distPath = path.join(__dirname, "../frontEnd/dist");
app.use(express.static(distPath));

app.use((req,res)=>{

  res.sendFile(path.join(distPath, "index.html"));  
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

