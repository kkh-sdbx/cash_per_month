import EVENT_TARGET_BUNDLE from "./EVENT_TARGETS.js";
import CALLAPI from "./API_CALLER.js";

require("dotenv").config();
const APIKEY = process.env.API_KEY;
const express = require('express');

const cors = require('cors');
const app = express();
const port = 3000;


const TEST_CALL ="http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc?inqryDiv=1&inqryBgnDt=201606010000&inqryEndDt=201606052359&pageNo=1&numOfRows=10&ServiceKey=";

// // index는 
// // 1.express만 require해서 클라이언트와 통신 
// // 2. Event 듣고 하위 모듈들의 메서드 콜.


app.use(cors());
app.get("/justGet",async (req, res) => {
    try {
        const response = await "connection DONE!";
        res.send(response);
    } catch (error) {
        console.error("something is wrong!");
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
 * 
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
  <h1>It's Working!!</h1>
  <table id ="result">
    <h2> If you start investing $TOTALAMOUNT, 000% in XXX, 000% in YYY... </h2>
    <h2> while cashing out AAA% || $BBB per month </h2>
    <h2> for next CC years, this will happen </h2>
    <tr class "resultTitle">
      <td> YEAR </td>
      <td> Portfolio Name </td>
      <td> Monthly Dividend(월 배당금) </td>
      <td> Total Input(원금) </td>
      <td> Yearly Dividend rate(배당률) </td>
      <td> Estimated Tax rate(세율) </td>
      <td> Estimated Tax amount(세금) </td>
      <td> Estimated Tax amount(세금) </td>
      <td> (총액) </td>
    </tr>
    <tr class "na">
      <td> YEAR 1 </td>
      <td> something 1</td>
    </tr>
    <tr class "na">
      <td> YEAR 2 </td>
      <td> something 2</td>
    </tr>
    
    
  </table>
  
  
  <div id = "pingsPongs">
        <h1> ping pond area</h1>
        <button id = "ping" color = "green"> LET'S GOOOOO!!!</button>
        <img id = "apiImage"> </img>
        <button id = "getAPI">!! GET API !!</button>

  </div>
</body>

<script>
  const ping = document.getElementById("ping");
  const getAPI= document.getElementById("getAPI");
  ping.addEventListener("click", async ()=>{
	try{
		const response = await fetch("http://136.111.155.228:3000/justGet");

		if(!response.ok){
			throw new Error("something is wrong!" + response.status);
		}

		const data = await response.text();
		console.log(response);
		console.log(data);
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

