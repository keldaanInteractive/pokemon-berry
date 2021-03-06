require('dotenv').config();
const { join } = require('path');
const { createServer } = require('http');
const express = require('express');
const helmet = require('helmet');
const { Server } = require('colyseus');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const PlayerModel = require('./model/player');

const port = Number(process.env.PORT) || 9000;
const app = express();
const httpServer = createServer(app);
const gameServer = new Server({ server: httpServer });

const firebaseKey = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey)
});

//console.log(process.env);
// Express middleware
//app.use(helmet({ contentSecurityPolicy: false })); // process.env.NODE_ENV === 'production'
app.use(express.json());
app.use(express.static(join(__dirname, 'client', 'dist')));

// Single Page App routing
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'index.html'));
});

app.get('/zone', (req, res) => {
  //console.log(req.query);
  PlayerModel.findOne({id: req.query.id}).then(doc=>{
    if(doc){
      res.json({zone : doc.zone});
    }
    else{
      res.json({zone: ZONES.PALLET_TOWN});
    }
  });
});

// Colyseus room
const { ZONES } = require('./shared/enum');
const GameRoom = require('./room/game-room');

Object.keys(ZONES).forEach(zone => {
  maclass = class extends GameRoom{
    constructor(){
        super(zone);
    }
  }
  gameServer.define(zone, maclass);
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((err) =>{
  gameServer.listen(port).then(() => {
    console.log(`Game server started, listening on port ${port}`);
  });
});
// Start

