const EVENT_TARGETS = require("./EVENT_TARGETS.js");
const CALLAPI = require("./API_CALLER.js");
const FILTER_RESULTS = require("./FILTER.js");
const DATA_HANDLER = require("./DATA_AFTER_HANDLER.js");

require("dotenv").config();
const APIKEY = process.env.API_KEY;
const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const port = 3000;

const CALLER = CALLAPI();
const FILTER = FILTER_RESULTS();
const HANDLE_RESULT = DATA_HANDLER();

const TEST_CALL ="http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc?inqryDiv=1&inqryBgnDt=201606010000&inqryEndDt=201606052359&pageNo=1&numOfRows=10&ServiceKey=";

// // index는 
// // 1.express만 require해서 클라이언트와 통신 
// // 2. Event 듣고 하위 모듈들의 메서드 콜.

// 프로그램의 흐름은 Caller->Filter->Data After Handler



let filteredResult = null;
let dataToShow = null;

let testResult = null;

EVENT_TARGETS.CALL_FINISHED.addEventListener("callFinished", (event) => {
    const filteredData = FILTER.filterTest(event.detail);
  
  // 필터 로직. FILTER.XX
  //filteredResult = FILTER.xx();

    console.log("filteredData: ", filteredData);
    EVENT_TARGETS.FILTER_FINISHED.dispatchEvent(new CustomEvent("filterFinished", { detail: filteredData }));
});

EVENT_TARGETS.FILTER_FINISHED.addEventListener("filterFinished", (event) => {
    const dataToShow = HANDLE_RESULT.dataHandlerTest(event.detail);   

    console.log("data Handler Finished, FrontEnd Update Required: ", dataToShow);
    EVENT_TARGETS.DATA_HANDLER_FINISHED.dispatchEvent(new CustomEvent("dataHandlerFinished", { detail: dataToShow }));  
});



app.use(cors());

const runPipeline = (apiCallrawData)=>{
    
    return new Promise((resolve, reject)=>{
        EVENT_TARGETS.DATA_HANDLER_FINISHED.addEventListener("dataHandlerFinished", function endPipeline(event){
    
            EVENT_TARGETS.DATA_HANDLER_FINISHED.removeEventListener("dataHandlerFinished",endPipeline);
            // 프론트엔드 업데이트 로직. 
            console.log("frontEnd Update Logic runs now: ", event.detail);

            //프론트엔드에 전달할 데이터 업데이트
            resolve(event.detail);
        
        
        });

        EVENT_TARGETS.CALL_FINISHED.dispatchEvent(new CustomEvent("callFinished", { detail: apiCallrawData }));


    });

};


app.get("/justGet",async (req, res) => {
    try {
        const callRawData = await CALLER.testCall(APIKEY);
        const response = await runPipeline(callRawData);
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

