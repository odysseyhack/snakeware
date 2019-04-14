import axios from 'axios'

export default {

    requestHandler(endpoint, type, data = null) {
        return new Promise((resolve, reject) => {
            axios({
                method: type,
                url: process.env.hostname +':30001/v1/backend_processor'+ endpoint,
                data: data
            }).then((response) => {
                resolve(response.data);
            }).catch((e) => {
                reject(e);
            });
        });
    },

}
