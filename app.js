//TODO: LOAD IN ALL CONFESSIONS USING FACEBOOK API RATHER THAN LINKING TO THE FB PAGE!

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



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thefffoundry.firebaseio.com"
});
const db = firebase.database();
const ref = db.ref();


const freshmen = ref.child("freshmenPosts");
const sophomores = ref.child("sophomorePosts");
const juniors = ref.child("juniorPosts");
const seniors = ref.child("seniorPosts");

function addFreshmen(content) {
  freshmen.push({
    post: content,
  });
}

function addSophomores(content) {
  sophomores.push({
    post: content,
  });
}

function addJuniors(content) {
  juniors.push({
    post: content,
  });
}

function addSeniors(content) {
  seniors.push({
    post: content,
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
addMod('matthew@techhacks.nyc', 'matthewsings5@gmail.com');





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
      //console.log(errorMessage)
      // ...
    }).then(data => {
      //some sort of error
    })
    .catch(error => {
      res.render('login', {
        success: success
      })
    });
})

app.get('/login', function(req, res) {
  res.render('login')
})
app.get('/logout', function(req, res) {
  let user = firebase.auth().currentUser;
  if (user) {
  firebase.auth().signOut().then(function() {
    res.render('login', {
      success: 'Logged out!'
    })
  }, function(error) {
    console.log(error);
    res.render('login', {
      error: 'Log in first.'
    })
  })
}
else{
  res.render('login', {
    error: 'Log in first.'
   })
}
});
app.post('/postSignIn', function(req, res) {
  console.log(req.body);
  let password = req.body.password;
  let email = req.body.email;
  let user = firebase.auth().currentUser;
  if (user) {
    //TODO: Show user info is correct and redirect
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
            //TODO: Show user info is correct and redirect
            success = "You're logged in!";
            res.render('login', {
              success: success
            })
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
  if (firebase.auth().currentUser) {
    checkRole(firebase.auth().currentUser.email).then(check => {
      if (check == true) {
        email = firebase.auth().currentUser.email;
        res.render('admindash', {
          email: email
        })
      } else {
        res.render('login', {
          error: 'Request unauthorized.'
        })
      }
    });
  } else {
    res.render('login', {
      error: 'Login first.'
    })

  }
})
//TODO: Catch errors and successes
app.post('/addAdmin', function(req, res) {
  let addEm = req.body.addEm;
  addMod(addEm, firebase.auth().currentUser.email).catch(function(error){
    res.render('admindash', {error:'Did not work. User may not exist or permission may not be valid.'});
  }).then(data => {
    res.render('admindash', {success:'User added!'})
  })
  .catch(error => {
    res.render('admindash', {success:'User added!'})
  });
})
app.post('/removeAdmin', function(req, res) {
  let removeEm = req.body.removeEm;
  removeMod(removeEm, firebase.auth().currentUser.email).catch(function(error){
    res.render('admindash', {error:'Did not work. User may not exist or permission may not be valid.'});
  }).then(data => {
    res.render('admindash', {success:'User removed!'})
    })
    .catch(error => {
      res.render('admindash', {success:'User removed!'})
    });
})
// blog shenanigans
// TODO: Add support for author
// TODO: Add security things
app.post('/freshmen', function(req, res) {
  console.log(req.body);
  let content = req.body.content;
  addFreshmen(content)
  res.redirect('/admin');
})
app.post('/sophomores', function(req, res) {
  console.log(req.body);
  let content1 = req.body.content1;
  addSophomores(content1)
  res.redirect('/admin');
})
app.post('/juniors', function(req, res) {
  console.log(req.body);
  let content2 = req.body.content2;
  addJuniors(content2)

  res.redirect('/admin');
})
app.post('/seniors', function(req, res) {
  console.log(req.body);
  let content3 = req.body.content3;
  addSeniors(content3)

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

app.listen(8000, () => {
  console.log('*NOS ORTUM SUPRA*');
});
