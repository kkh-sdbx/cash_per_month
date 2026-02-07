// 136.111.155.228


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.get("/api-test",async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com');
        res.json({"data": response.data });
    } catch (error) {
        res.status(500).send('Error fetching data from GitHub API');
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


    /**
 * 
 * <html>

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

  </div>
</body>

<script>
  const ping = document.getElementById("ping");

  ping.addEventListener("click",()=>{
      ping.fetch
</script>
</html>

 */
