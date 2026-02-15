const EVENT_TARGETS = require("./EVENT_TARGETS.js");
const SHEET_INDEX = {
    "최초공고검토일" :new Date(),
    "최초검토자" :".",
    "사전검토출처" :".",
    "공고월" :".",
    "사전/공고" :".",
    "입찰/투찰" :".",
    "운영부서" :"본회",
    "진행/검토중" :"검토중",
    "고객사" :".",
    "사업명" :".",
    "금액" :".",
    "제출일시":".",
    "전자투찰" :".",
    "PT일시" :".",
    "입찰타당성 분석 내용(드랍 시 사유작성+PT 피드백)":".",
    "제안담당" :".",
    "제출 규격특이사항" :".",
    "제출 결과 PT자" :".",
    "피드백 (수주, 실주 분석 사항)★타본부 도메인 이슈 사항★":".",
    "비고":"."

};




/*
const SHEET_INDEX = [
No. 
"최초공고검토일" 
"최초검토자" 
"사전검토출처" 
"공고월" 
"사전/공고" 
"입찰/투찰" 
"운영부서" 
"진행/검토중" 
고객사 
사업명 
금액 
"제출일시"
 "전자투찰" 
 "PT일시" 
 입찰타당성 분석 내용(드랍 시 사유작성+PT 피드백) 
 "제안담당" 
 "제출 규격특이사항" 
 제출 결과 PT자 
 "피드백 (수주, 실주 분석 사항)★타본부 도메인 이슈 사항★"
  비고
]
*/

const HANDLE_RESULT = ()=>{
  const dataHandlerTest = (filteredData)=>{
    console.log("data handler Test: data handler module works.",filteredData);
  }

  return filteredData
}

module.exports = HANDLE_RESULT;