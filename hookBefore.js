const axios = require('axios');
const { admin} = require('./modules/user/_data/user.data');

module.exports = async function (capabilities, specs) {
    const response = await axios({
        method: 'post',
        url: 'https://server-stage.pasv.us/user/login',
        data: {
            email: admin.email,
            password: admin.password,
        },
    })
        .then(res => res)
        .catch(err => {console.log('ERROR', err)});
    process.env.ADMIN_TOKEN = response.data.token;
};
