alert("Google Extension!");

/*
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
*/

let resultTitle = document.querySelector(".resultTitle");
// 위의 tr 가져옴.


// 개별종목의 데이터 구조, 예시로 든다.
const ASSET = {"ticker":"SCHD",
"nums":{
"price":27.4,
"dividend":0.7,
"dividendGrowth":0.11,
"priceGrowthPerYear":0.1,
"MDDin10Years":0.2
"dividendFrequency":3 //3달마다(===분기) 배당.
}
}


// input을 받아서 진행해야 한다. 여기선 예시만,
// 포트폴리오 비중 큰 순으로 iterate, sort.

let SELECTED_PORTFOLIO = new Map([]);


// N년간 월 배당금을 계산하는 함수

function showDividends(years,portfolio){

for (let i=1;i<=years;i++){

//portfolio의 자료 구성을 검토해야 한다.
}

}