import {expect}  from 'chai';
import axios from 'axios';
import { admin } from '../../user/_data/user.data';

describe('REQUESTS TO DATABASE', () => {
    it('should get info from database', async() => {
    const response = await axios
        .get('https://server-stage.pasv.us/info')
        .then(res => res)
        // .then(res => {
        //     return res.status;
        .catch(err => {console.log('ERROR', err)});
    console.log(response);
        expect(response.status).eq(200);
        expect(response.data).to.not.be.empty;
        expect(Object.keys(response).length).to.be.above(0);
        expect(response).to.be.an.instanceof(Object);
        });

    it('should login', async() => {
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
        expect(response.data).to.include.keys('token');
        expect(response.status).eq(200);
    });

    it('should check if it returns token', () => {
        expect(process.env.ADMIN_TOKEN).is.not.empty;
        expect(process.env.ADMIN_TOKEN).to.not.be.empty;
        expect(process.env.ADMIN_TOKEN).to.have.length.of.above(0);
        expect(process.env.ADMIN_TOKEN.length).to.be.above(0);
    });
});



