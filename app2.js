/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
 let rp=require('request-promise')
 function main(params){
 
 if(params.action==='joke'){
     const options ={
         uri:"https://api.icndb.com/jokes/random",
         json:true
     }
     return rp(options)
     .then(res=>{
         return{response:res}
     })
 } 
 else if(params.actions==='fact'){
     const options={
         uri:"https://catfact.ninja/fact",
         json:true
     }
     return rp(options)
     .then(res=>{
         return {response:res}
     })
 }
 else if (params.actions==='weather'){
      const options={
          uri:"http://api.openweathermap.org/data/2.5/weather?q=denver&appid=7cd8f381ca0ea2b1933bd722800f512e",
          json:true
 
      }
      return rp(options)
      .then(res=>{
          return {response:res}
      })
 
  }
     
 }

/*
front side dev saved bluemix intents and entities
POST/GET 
https://us-south.functions.cloud.ibm.com/api/v1/web/victor%40bostonhotcars.com_dev/default/martivictwoAction.json
*/