const axios = require('axios');
const config = require('./config')

const Timer = require('./timer')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'time', title: 'Time'},
    {id: 'status', title: 'StatusCode'},
    {id: 'data', title: 'data'}
  ]
});

let records = [];

const callapi = async () => {
    let record = {
        time: Date.now()
    };
    let data = await axios.get(config.url);
    console.log({
        status: data.status,
        // headers: data.headers
    });
    // console.log(data.data);
    record.status = data.status;
    record.data = JSON.stringify(data.data);
    records.push(record);
}

process.on('SIGINT',async ()=>{
    console.log("Writing data to CSV Before Exit !!!");
    console.log(records);
    
    await csvWriter
        .writeRecords(records)
        .then(()=> console.log('The CSV file was written successfully'));
    process.exit();
    
})

const main = () => {
    let timer = new Timer(config.delay,callapi);
    timer.start();
}

main();
