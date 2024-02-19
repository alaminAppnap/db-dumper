const express = require('express')
const app = express()
require('dotenv').config();
const cron = require('node-cron');
const { dbDumpOperation } = require('./operations/db-dump');

const port = process.env.PORT || 4000;


// Run every morning 07:00 AM
cron.schedule('0 7 * * *',async () => {
  // await smsBalanceSlackNotifyOperation();
  console.log(`Successfully notified!`);
},{
  timezone: 'Asia/Dhaka'
});



app.get('/dump',async (req, res) => {
  const mysqlHost = process.env.ROBODOC_MYSQL_HOST;
  const mysqlPort = process.env.ROBODOC_MYSQL_PORT;
  const mysqlUser = process.env.ROBODOC_MYSQL_USER;
  const mysqlPassword = process.env.ROBODOC_MYSQL_PASSWORD;
  const databaseName = process.env.ROBODOC_MYSQL_DB_NAME;
  const folderName = 'amarpet';

  await dbDumpOperation(mysqlHost,mysqlPort,mysqlUser,mysqlPassword,databaseName,folderName);
  res.send(`Successfully dump database!`);
})



app.get('/',async (req, res) => {
  res.send(`Home page!`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})