//TODO: LOAD IN ALL CONFESSIONS USING FACEBOOK API RATHER THAN LINKING TO THE FB PAGE!
//req.signedCookies['session']
// USE CONFIG FOR API KEYS
// process.env.
//Survey API -> http://surveybths.com/wp-json/wp/v2/posts/23
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter')
const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
dotenv.config();
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);
var express = require('express')
var app = express()
app.listen(process.env.PORT || 8080);
let success = "Success!"
var bodyParser = require("body-parser");
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'jade');
//Firebase operations
var firebase = require('firebase')
var admin = require('firebase-admin');
var serviceAccount = require("./thefffoundry-firebase-adminsdk-dy2sw-9622fa9200.json");
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "thefffoundry.firebaseapp.com",
  databaseURL: "https://thefffoundry.firebaseio.com",
  projectId: "thefffoundry",
  storageBucket: "",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
firebase.initializeApp(config);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieEncrypter(process.env.COOKIE_SECRET));



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thefffoundry.firebaseio.com"
});
const db = firebase.database();
const ref = db.ref();
const moment = require('moment')

const clubss = ref.child("clubs");

const freshmen = ref.child("freshmenPosts");
const sophomores = ref.child("sophomorePosts");
const juniors = ref.child("juniorPosts");
const seniors = ref.child("seniorPosts");

const suggestionss = ref.child("suggestions");
//Search functions
const contactsRef = db.ref('/clubs');
contactsRef.on('child_added', addOrUpdateIndexRecord);
contactsRef.on('child_changed', addOrUpdateIndexRecord);
contactsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(contact) {
  // Get Firebase object
  const record = contact.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = contact.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord({key}) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting contact from Algolia', error);
      process.exit(1);
    });
}

//end

//nodemailer start
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thefoundrybot@gmail.com',
    pass: process.env.FOUNDRY_EMAIL_PASS

  }
});

var mailOptions = {
};
//end

function addSuggestion(name, osis, description, type){
  suggestionss.push({
    name: name,
    osis: osis,
    description: description,
    type: type,
  })
}

function addClub(name, description, drive, calendar, creator, unique, type){
  clubss.push({
    name: name,
    description: description,
    drive: drive,
    calendar: calendar,
    creator: creator,
    time: moment().format(),
    uniquedesc: unique,
    type: type,
  })
}


function addFreshmen(content, author) {
  freshmen.push({
    post: content,
    time: moment().format(),
    author: author,
  });
}

function addSophomores(content, author) {
  sophomores.push({
    post: content,
    time: moment().format(),
    author: author,

  });
}

function addJuniors(content, author) {
  juniors.push({
    post: content,
    time: moment().format(),
    author: author,
  });
}

function addSeniors(content, author) {
  seniors.push({
    post: content,
    time: moment().format(),
    author: author,
  });
}

//check if admin
async function checkRole(email) {
  let status = false;
  await admin.auth().getUserByEmail(email).then((userRecord) => {
    // The claims can be accessed on the user record.
    console.log(email + ': ' + userRecord.customClaims.admin);
    if (userRecord.customClaims.admin == true) {
      status = true;
    } else {
      status = false;
    }
  });
  console.log(status)
  return status;
}

//setting custom claims for admins
async function addMod(email, emailCurrentUser) {
  const user = await admin.auth().getUserByEmail(email);
  const uid = user.uid;
  checkRole(emailCurrentUser).then(check => {
    if (check == true) {
      console.log('Authorized!')
      console.log(uid);
      admin.auth().setCustomUserClaims(uid, {
        admin: true
      }).then(() => {});
    } else {
      console.log('Request unauthorized.')
    }
  });
};
async function removeMod(email, emailCurrentUser) {
  const user = await admin.auth().getUserByEmail(email);
  const uid = user.uid;
  checkRole(emailCurrentUser).then(check => {
    if (check == true) {
      console.log('Authorized!')
      console.log(uid);
      admin.auth().setCustomUserClaims(uid, {
        admin: false
      }).then(() => {});
    } else {
      console.log('Request unauthorized.')
    }
  });
};





//End of firebase operations

app.get('/', function(req, res) {
  res.render('index')
})
app.post('/postSignUp', function(req, res) {
  console.log(req.body);
  let password = req.body.password;
  let email = req.body.email;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        res.render('login', {
          error: errorMessage
        })
  }).then(

  ).catch(
    // cannot check cookies as they do not exist yet.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        success = "You've successfully registered!";
        res.cookie('session', firebase.auth().currentUser, { signed: true, maxAge: 900000, httpOnly: true });
        res.set('cache-control', 'max-age=0, private') // may not be needed. Good to have if behind a CDN.
        removeMod(firebase.auth().currentUser.email.replace(/^"(.*)"$/, '$1'),'matthewsings5@gmail.com')
        res.render('login', {
          success: success
        })
        return firebase.auth().signOut(); //clears session from memory
      }
    })
  )
})
app.get('/login', function(req, res) {
  res.render('login')
})
app.get('/logout', function(req, res) {
  let user = req.signedCookies['session'];
  console.log(user)
  if (user) {
      res.clearCookie("session")
      res.render('login', {
        success: 'Logged out!'

    })
  } else {
    res.render('login', {
      error: 'Log in first.'
    })
  }
});
app.post('/postSignIn', function(req, res) {
  console.log(req.body);
  let password = req.body.password;
  let email = req.body.email;
  let user = req.signedCookies['session'];
  if (user) {
    success = "You're already logged in!";
    res.render('login', {
      success: success
    })
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        res.render('login', {
          error: errorMessage
        })
      })
      .then(

      ).catch(
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            success = "You're logged in!";
            res.cookie('session', firebase.auth().currentUser, { signed: true, maxAge: 900000, httpOnly: true });
            res.set('cache-control', 'max-age=0, private') // may not be needed. Good to have if behind a CDN.
            res.render('login', {
              success: success
            })
            return firebase.auth().signOut(); //clears session from memory
          } else {
            res.render('login', {
              error: errorMessage
            })
          }
        })
      );
  }
})
app.get('/admin', function(req, res) {
  if (req.signedCookies['session']) {
    checkRole(req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1')).then(check => {
      if (check == true) {
        email = req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1');

        res.render('admindash', {
          email: email,
          suggestions: suggestions,
        })
        suggestions = [];
        getData(suggestions, "suggestions")
      } else {
        res.render('login', {
          error: 'Request unauthorized.'
        })
      }
    })
  } else {
    res.render('login', {
      error: 'Log in first.'
    })

  }
})
//TODO: Catch errors and successes
app.post('/addAdmin', function(req, res) {
  let addEm = req.body.addEm;
  addMod(addEm, req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1')).catch(function(error) {
      res.render('admindash', {
        error: 'Did not work. User may not exist or permission may not be valid.'
      });
    }).then(data => {
      res.render('admindash', {
        success: 'User added!'
      })
    })
    .catch(error => {
      res.render('admindash', {
        success: 'User added!'
      })
    });
})
app.post('/removeAdmin', function(req, res) {
  let removeEm = req.body.removeEm;
  removeMod(removeEm, req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1')).catch(function(error) {
      res.render('admindash', {
        error: 'Did not work. User may not exist or permission may not be valid.'
      });
    }).then(data => {
      res.render('admindash', {
        success: 'User removed!'
      })
    })
    .catch(error => {
      res.render('admindash', {
        success: 'User removed!'
      })
    });
})
// blog shenanigans
// TODO: Add support for author
// TODO: Add security things
app.post('/freshmen', function(req, res) {
  console.log(req.body);
  let content = req.body.content;
  addFreshmen(content,req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1'))
  res.redirect('/admin');
})
app.post('/sophomores', function(req, res) {
  console.log(req.body);
  let content1 = req.body.content1;
  addSophomores(content1,req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1'))
  res.redirect('/admin');
})
app.post('/juniors', function(req, res) {
  console.log(req.body);
  let content2 = req.body.content2;
  addJuniors(content2,req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1'))

  res.redirect('/admin');
})
app.post('/seniors', function(req, res) {
  console.log(req.body);
  let content3 = req.body.content3;
  addSeniors(content3,req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1'))

  res.redirect('/admin');
})


app.post('/postSuggestion', (req, res) => {
  console.log(req.body);
  let name = req.body.name.trim();
  let osis = req.body.osis.trim();
  let description = req.body.desc.trim();
  let type = req.body.type;

  if (req.signedCookies['session']) {
    addSuggestion(name, osis, description, type)
    res.render("suggestions", {success: "Suggestion sent!"})
  } else {
    res.render('suggestions', {
      error: 'Log in first.'
    })

  }
});

//get
//TODO: Finish!!!
//TODO: Load in posts!

//test







// ref.on("value", function(snapshot) {
//   const post = snapshot.val();
//   console.log(post.child("freshmPosts/ada"));
//   console.log(post.sophomorePosts);
//   console.log(post.juniorPosts);
//   console.log(post.seniorPosts);
//
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });
let freshmenPostss = [];
let sophomorePostss = [];
let juniorPostss = [];
let seniorPostss = [];
let clubs = [];
let clubName = [];
let suggestions = [];

async function getData(data, ref) {
  var query = firebase.database().ref(ref).orderByKey();
  query.once("value")
    .then(function(snapshot) {
      //   ref.on("child_added", function(snapshot, prevChildKey) {
      //   var newPost = snapshot.val();
      //   console.log("Author: " + newPost.author);
      // });

      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        // console.log(childData)
        data.push(childData)
      });
    })
}
getData(clubs, "clubs")
getData(freshmenPostss, "freshmenPosts")
getData(sophomorePostss, "sophomorePosts")
getData(juniorPostss, "juniorPosts")
getData(seniorPostss, "seniorPosts")
getData(suggestions, "suggestions")


//end test
//TODO: FINISH
app.get('/freshmenget', function(req, res) {
  res.render('freshmenget', {
    freshmenPosts: freshmenPostss
  })
  freshmenPostss = [];
  getData(freshmenPostss, "freshmenPosts")

});
app.get('/sophomoresget', function(req, res) {
  res.render('sophomoresget', {
    sophomorePosts: sophomorePostss
  })
  sophomorePostss = [];
  getData(sophomorePostss, "sophomorePosts")

});
app.get('/juniorsget', function(req, res) {
  res.render('juniorsget', {
    juniorPosts: juniorPostss
  });
  juniorPostss = [];
  getData(juniorPostss, "juniorPosts")
})
app.get('/seniorsget', function(req, res) {
  res.render('seniorsget', {
    seniorPosts: seniorPostss
  });
  seniorPostss = [];
  getData(seniorPostss, "seniorPosts")

})
app.get('/userdash', function(req, res) {
  if (req.signedCookies['session']) {
    res.render('userdash', {
      user: req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1')
    })

  } else {
    res.render('login', {
      error: 'Log in first.'
    })

  }
});
// add club approval feature
app.get('/clubs', function(req, res) {
  res.render('clubs', {
    clubs: clubs,
  })
  clubs = [];
  getData(clubs, "clubs")


});


async function checkClubSend(array, name, req){
  console.log('starting')
  array.forEach(function(club) {
    if(club.name == name){
       mailOptions = {
        from: 'thefoundrybot@gmail.com',
        to: req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1'),
        subject: `${req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1')} wants to join ${name}!`,
        text: `Hey ${club.creator}! A student wants to join ${name}! Email them (${req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1')}) to accept or reject their request!`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }

        });
      }
    })
}


app.get('/join/:position', (req, res) => {
    let position = req.params.position;
    clubNameJoin = clubs.map(({ name }) => name)

  if (clubNameJoin.includes(position)) {

    if (req.signedCookies['session']) {
      checkClubSend(clubs, position, req);
      res.render('clubdash', {clubName: position, allClubs: clubNameJoin, clubs: clubs, success: 'Request sent by email!'})

    }
    else{
      res.render('clubdash', {clubName: position, allClubs: clubNameJoin, clubs: clubs, error: 'Log in first.'})
    }
  }
  else if (clubNameJoin.includes(position)==false){
    res.redirect('/404')
    console.log("bork")
  }
  clubNameJoin = [];
});


app.get("/clubs/:position", (req, res) => {
  let position = req.params.position;
  clubName = clubs.map(({ name }) => name)
  if (clubName.includes(position)) {
    res.render('clubdash', {clubName: position, allClubs: clubName, clubs: clubs});

    //res.send(`<h1>${position} exists, but we're working on this feature. Please email the president to join at this moment. Updates are coming soon!</h1><br><h2>All clubs: ${clubName}</h2><br><h2>VERSION 0.1.2</h2>`);
  } else if (clubName.includes(position)==false){
    res.redirect('/404')
  }
  clubName = [];

});

app.get('/suggestions',  (req, res) => {
  res.render('suggestions', {})

});

app.get('/makeClub', function(req, res) {
  console.log("cookie: " + req.signedCookies['session'])
  if (req.signedCookies['session']) {
    res.render('makeClub')

  } else {
    res.render('clubs', {
      error: 'Log in first.',
      clubs: clubs,
    })

  }
});
app.get('/vote', function(req, res) {
  res.render('polls')
})
// testing different styles
app.get('/privacy', function(req, res) {
  res.render('testprivacy')
})
app.get('/about', function(req, res) {
  res.render('testabout')
})



// end test
//maybe this should be an admin only feature?
app.get('/makePoll', function(req, res) {
  if (req.signedCookies['session']) {
    res.send('<h1>Feature is currently incomplete! Updates are coming soon!</h1><br><h2>VERSION 0.1.2</h2>')

  } else {
    res.render('polls', {
      error: 'Log in first.'
    })

  }

});

app.post('/postClub', (req, res) => {
  console.log(req.body)
  let unique = req.body.unique.trim();
  let type = req.body.type;
  let name = req.body.club_name.trim();
  let description = req.body.desc.trim();
  let drive = req.body.drive.trim();
  let calendar = req.body.calendar.trim();
  let creator = req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1');
  console.log("creator" + JSON.stringify(creator))
  addClub(name, description, drive, calendar, creator, unique, type)
  //TODO: do some function to add club to database
  res.render('clubs', {
    success: "Club made! Click on clubs tab to see changes.",
    clubs: clubs,
  })
  clubs = [];
  getData(clubs, "clubs")

});
app.get('/*', function(req, res) {
  res.render('404')
})
app.get('/404', function(req, res) {
  res.render('404')
})
app.listen(8000, () => {
  console.log('*NOS ORTUM SUPRA*');
});
