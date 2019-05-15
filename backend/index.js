const FitbitApiClient = require("fitbit-node");
const express = require("express");
const rp = require("request-promise")


const fitbitAuthServer = express();

const client = new FitbitApiClient({
    clientId: "22DPF6",
    clientSecret: "130867304fbc7fa872c2e3c059eb0940",
    apiVersion: '1.2' // 1.2 is the default
});

const fitbitAuthCallbackUrl = `https://157.230.2.203:443/callback`

// redirect the user to the Fitbit authorization page
fitbitAuthServer.get("/authorize", (req, res) => {
	// request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
	res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', fitbitAuthCallbackUrl));
});

// handle the callback from the Fitbit authorization flow
fitbitAuthServer.get("/callback", async (req, res) => {
    // exchange the authorization code we just received for an access token
    
    let accessTokenResult = await client.getAccessToken(req.query.code, fitbitAuthCallbackUrl)
    let profileDetails = await client.get("/profile.json", accessTokenResult.access_token)

    let id = profileDetails[0].encodedId
    let accessToken = accessTokenResult.access_token

    console.log(`saving access token for id ${id} to dataservice /accounts route`)

    //post this to dataService
     let options = {
        uri: 'http://localhost:5000/accounts',
        method: 'POST',
        body: {
            id,
            accessToken
        },
        json: true
    }
             
    try{            
        accounts = await rp(options)
    } catch(error){
        console.log(error)
    }



});

// launch the server
fitbitAuthServer.listen(443);
