// 프로그램의 흐름은 Caller->Filter->Data After Handler

const CALLAPI = require("./API_CALLER.js");
const FILTER_RESULTS = require("./FILTER.js");
const DATA_HANDLER = require("./DATA_AFTER_HANDLER.js");

const CALLER = CALLAPI(); 
const FILTER = FILTER_RESULTS(); 
const HANDLER = DATA_HANDLER(); 

const RUN_PIPELINE = async (apikey)=>{

    const callTime = new Date();

    const rawData = CALLER.testCall(apikey);

    const filteredData = FILTER.filterTest(rawData);

    const dataToShow = HANDLER.handlerTest(filteredData);

    const result = [callTime, dataToShow];

    return result
};

module.exports = RUN_PIPELINE ;