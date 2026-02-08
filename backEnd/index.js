const EVENT_TARGETS = require("./EVENT_TARGETS.js");
const CALLAPI = require("./API_CALLER.js");

require("dotenv").config();
const APIKEY = process.env.API_KEY;
const express = require('express');

const cors = require('cors');
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
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.get("/getAPI",async (req, res) => {
    try {
        const response = await axios.get(TEST_CALL + KEY + TYPE_JSON);
        res.json({"data": response.data });
    } catch (error) {
        res.status(500).send('Error fetching data from GitHub API');
    }
});


/**
<html>

<head>
<title>Hello Google!</title>
</head>
<style>
#pingsPongs{
    background-color : cyan;
} 
#ping{
    background-color : green;
}
</style>

<body>
  
  <div id = "pingsPongs">
        <h1> ping pond area</h1>
        <button id = "ping" color = "green"> LET'S GOOOOO!!!</button>
        <img id = "apiImage"> </img>
        <button id = "getAPI">!! GET API !!</button>

  </div>  
  
  <div>
  <ul id="searchResult">
  
  </ul>
  </div>

</body>

<script>
  const ping = document.getElementById("ping");
  const getAPI= document.getElementById("getAPI");
  const searchResult= document.getElementById("searchResult");

  const updateSearchResult = (data)=>{
    let toAdd = "";

    for(let i=0;i<11;i++){

      let biz_org = data.response.body.items[i].orderInsttNm;
      let biz_name = data.response.body.items[i].prcrmntReqNm;
      let biz_price = data.response.body.items[i].rprsntUprc;

      toAdd = `${biz_org} / ${biz_name} / ${biz_price}`;
      let added_li = document.createElement("li");
      added_li.innerHTML = toAdd;
      searchResult.appendChild(added_li);
    }
    
    
  };

  ping.addEventListener("click", async ()=>{
	try{
		const response = await fetch("http://35.226.25.54:3000/justGet");

		if(!response.ok){
			throw new Error("something is wrong!" + response.status);
		}

		const data = await response.json();
		console.log(data);
    updateSearchResult(data);

	}
	catch(error){
		console.error("error: ", error );


	}

  });
  getAPI.addEventListener("click", async ()=>{
	try{
		const response = await fetch("http://136.111.155.228:3000/getAPI");

		if(!response.ok){
			throw new Error("something is wrong!" + response.status);
		}

		const data = await response.json();
		console.log(response);
		console.log(data);
	}
	catch(error){
		console.error("error: ", error );


	}

  });
</script>
</html>

 */

