// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
//   function welcome(agent) {
//     agent.add(`Welcome to my agent!`);
//   }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}




  // // Uncomment and edit to make your own intent handler

  // // below to get this function to be run when a Dialogflow intent is matched
  function welcome(agent) {
     agent.add(`Hello. how can I help you? `);
  }
  
  function trip_planner(agent){
      agent.add('Sure, how long do you want to stay there?');
      agent.add(new Suggestion(`3 Hours`));
      agent.add(new Suggestion(`6 Hours`));
      agent.add(new Suggestion(`1 day`));
  }
  function answer_time(agent){
      agent.add('Showing you some itenaries.');
       agent.add(new Card({
         title: `Itenary 1`,
         imageUrl: 'https://preview.ibb.co/mvXp7e/it1.png',
             
         text: `Toursists love visiting this historic place! 💁`,
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      })
     );
     agent.add(new Suggestion('select'));
     agent.add(new Suggestion('Show me more'));
  }

  function trip_option_2(agent){
      agent.add('Showing you more results.');
       agent.add(new Card({
         title: `Trip 2`,
         imageUrl: 'https://preview.ibb.co/kgZK7e/it2.png',
             
         text: `Explore city landmarks and architecture. 💁`,
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      })
     );
     agent.add(new Suggestion('select'));
     agent.add(new Suggestion('Show me more'));
  }
  



  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
 
   function googleAssistantHandler(agent) {
     let conv = agent.conv(); // Get Actions on Google library conv instance
     conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
     agent.add(conv); // Add Actions on Google library responses to your agent's response
   }
   
   function test_entent(agent) {
     agent.add(`this is test`);
     let conv = agent.conv(); 
     conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
     agent.add(conv); // Add Actions on Google library responses to your agent's response
     var card1 = new Card({
         title: `card 1`,
         imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
         text: `text 1`,
         buttonText: 'button 1',
         buttonUrl: 'https://assistant.google.com/'
      });
     var card2 = new Card({
         title: `card 2`,
         imageUrl: 'https://preview.ibb.co/kgZK7e/it2.png',
         text: `text 2`,
         buttonText: 'button 2',
         buttonUrl: 'https://assistant.google.com/'
      });    
      agent.add(card1);
      agent.add(new Suggestion(`sug 0`));
    agent.add(card2);
    //  agent.add(new Suggestion(`sug 1`));
     agent.add(new Suggestion(`sug 2`));
    //  agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
   }
   function public_transportation(agent){
       agent.add('here is a schedule for the day trip')
       agent.add(new Card({
         title: `Architecture and landmarks`,
         imageUrl: 'https://preview.ibb.co/eqijOK/Screen_Shot_2018_08_19_at_07_57_59.jpg',
             
         text: `Schedule for travel`,
         
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      })
     );
     agent.add(new Suggestion(`Book Now`));

    //  agent.add(new Suggestion(`sug 1`));
    //  agent.add(new Suggestion(`Go Back`));
   }
   function payment_method(agent){
       agent.add('I have your paypal on file. Do you want to use it. ');
       agent.add(new Suggestion(`Yes`));

    //  agent.add(new Suggestion(`sug 1`));
     agent.add(new Suggestion(`Use Google Pay`));
   }
   function go_for_it(agent){
       agent.add(`how would you like to travel around ?`);
          agent.add(new Suggestion(`Bus`));

    //  agent.add(new Suggestion(`sug 1`));
     agent.add(new Suggestion(`Bike`));
     agent.add(new Suggestion(`Multimode`));
   }
   function paypal(agent){
       agent.add(new Card({
         title: `You will pay 38EUR.`,
         imageUrl: 'https://www.barkhofen-tiernahrung.de/wp-content/uploads/2014/07/PayPal-logo-300x300.jpg',
             
         text: `You will be redirected to paypal`,
         buttonText: 'PayNow',
         buttonUrl: 'https://www.paypal.com/signin?country.x=US&locale.x=en_US'
      })
     );
       
   }
   
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('test_entent', test_entent);
  intentMap.set('trip-planner', trip_planner);
  intentMap.set('answer-6hrs', answer_time);
  intentMap.set('answer-1-day', answer_time);
  intentMap.set('trip-option-2', trip_option_2);
  intentMap.set('go-for-it', go_for_it);
  intentMap.set('public-transportation', public_transportation);
  intentMap.set('payment-method', payment_method);
  intentMap.set('paypal', paypal);
//   intentMap.set('test_entent', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

