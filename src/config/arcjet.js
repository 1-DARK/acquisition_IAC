import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({ // Removed bot detection because Postman requests may be detected as bots.
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
    }),
    slidingWindow({
      mode: 'LIVE',
      interval: '2s',
      max: 5,
    }),
  ],
});

export default aj;

// OR

// import arcjet, { shield, slidingWindow } from '@arcjet/node';

// const aj = arcjet({
//   key: process.env.ARCJET_KEY,

//   rules: [
//     shield({ mode: 'LIVE' }),

//     // Removed bot detection because Postman requests may be detected as bots.

//     slidingWindow({
//       mode: 'LIVE',
//       interval: '2s',
//       max: 5,
//     }),
//   ],
// });

// export default aj;