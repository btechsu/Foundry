//TODO: LOAD IN ALL CONFESSIONS USING FACEBOOK API RATHER THAN LINKING TO THE FB PAGE!
//TODO: REPLACE ALL .currentUser questions with COOKIES!!!!!!
//req.signedCookies['session']
//Survey API -> http://surveybths.com/wp-json/wp/v2/posts/23
const cookieParser = require('cookie-parser');
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
  apiKey: "AIzaSyCNPi3w9i8aLseBI8wW4fMq59ZSw6eWois",
  authDomain: "thefffoundry.firebaseapp.com",
  databaseURL: "https://thefffoundry.firebaseio.com",
  projectId: "thefffoundry",
  storageBucket: "",
  messagingSenderId: "392224309755",
  appId: "1:392224309755:web:acf32c4d649a80a4"
};
firebase.initializeApp(config);
app.use(cookieParser('jdhsuiydsa98ody8sa09dsad892193933hd9eu9d9wqhdgqwahzgchjxdsafkycsy8ukE78o;qw2itywtytiqwuttiyqesud'));



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

function addClub(name, description, drive, calendar, creator){
  clubss.push({
    name: name,
    description: description,
    drive: drive,
    calendar: calendar,
    creator: creator,
    time: moment().format(),
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
      res.render('login', {
        error: errorMessage
      });

    }).then(data => {
      removeMod(req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1'),'matthewsings5@gmail.com')
      res.render('login', {
        success: success
      })
    })
    .catch(error => {
      removeMod(req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1'),'matthewsings5@gmail.com')
      res.render('login', {
        success: success
      })
    });
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
          email: email
        })
      } else {
        res.render('login', {
          error: 'Request unauthorized.'
        })
      }
    })
  } else {
    res.render('login', {
      error: 'Login first.'
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
      error: 'Login first.'
    })

  }
});
app.get('/clubs', function(req, res) {
  res.render('clubs', {
    clubs: clubs,
  })
  clubs = [];
  getData(clubs, "clubs")


});

//change to post
app.get("/clubs/:position", (req, res) => {
  let position = req.params.position;
  clubName = clubs.map(({ name }) => name)
  if (clubName.includes(position)) {
    res.send(`<h1>${position} exists, but we're working on this feature. Please email the president to join at this moment. Updates are coming soon!</h1><br><h2>All clubs: ${clubName}</h2><br><h2>VERSION 0.1.2</h2>`);
  } else if (clubName.includes(position)==false){
    res.redirect('/404')
  }
  clubName = [];

});

app.get('/clubs', function(req, res) {
  res.render('individualclub', {  })

});



app.get('/makeClub', function(req, res) {
  console.log("cookie: " + req.signedCookies['session'])
  if (req.signedCookies['session']) {
    res.render('makeClub')

  } else {
    res.render('clubs', {
      error: 'Login first.',
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
      error: 'Login first.'
    })

  }

});


app.post('/postClub', (req, res) => {
  console.log(req.body)
  let name = req.body.club_name.trim();
  let description = req.body.desc.trim();
  let drive = req.body.drive.trim();
  let calendar = req.body.calendar.trim();
  let creator = req.signedCookies['session'].email.replace(/^"(.*)"$/, '$1');
  console.log("creator" + JSON.stringify(creator))
  addClub(name, description, drive, calendar, creator)
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
