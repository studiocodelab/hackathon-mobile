import OpenAPIClientAxios from 'openapi-client-axios';

export default class API 
{
    async init()
    {
        this.api.init();
        let client = await this.api.getClient();
        this.client = client;
    }

    clientOperationList()
    {
        let list = [];
        for (key in this.client) {
            list.push(key);
        }
        return list;
    }

    constructor(json)
    {
        this.api = new OpenAPIClientAxios({ definition: json.definition });
    }
}

// API EXAMPLE
//
//async function doSth()
// {
//   let myApi = new API({definition: "https://petstore.swagger.io/v2/swagger.json"});
//   await myApi.init();
//   try {
//     let res =  await myApi.client.getPetById(1);
//     console.log('result:', res);
//   } catch (error) {
//     console.log('error:', error.request);
//   }
// // console.log(await API.ask("https://petstore.swagger.io/v2/pet/1"));
// }

// doSth();

