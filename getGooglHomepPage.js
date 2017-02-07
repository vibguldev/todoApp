const axios = require('axios');


const getGoogle = () => (axios.get('http://www.google.com'));
const getFacebook = () => (axios.get('http://facebook.com'));
getGoogle()
  .then((responseGoogle) => {
    return Promise.all[getFacebook(), responseGoogle]
  })
  .then((responseAll) => {
    console.log("\n\n\nFacebook : ", responseAll[0])
    console.log("\n\n\nGoogle : ", responseAll[1])

  })
  .catch(function (error) {
    console.log(error);
  });