function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

// Looks at the experiment cuirrently running.
//  If the experiment is over, it moves the experiment from 'running'
//  to 'logged'.
function manage_experiment(exp_id) {

    var rootRef = new Firebase("https://native-ads.firebaseio.com/"),
        running_Ref = rootRef.child('running'),
        logged_Ref = rootRef.child('logged'),
        exp_Ref = running_Ref.child(exp_id),
        current_exp = '';

    // Callback
    exp_Ref.once('value', function (snap) {
        current_exp = snap.val();

        var elapsed = (Date.now() - current_exp.start) / 60 / 1000;
        console.log('elapsed in minutes:', elapsed);
        // Has the experiment expired?
        if (elapsed > (current_exp.duration)) {
            alert('experiment is over!');

            logged_Ref.child(exp_id).set(current_exp);
            running_Ref.child(exp_id).remove(function () {
                deleteAllCookies();
                window.location.href = '/';
            });
        }

    });

}




// What if we set the cookie to the id?
    // Could we avoid using the URL args?

var rootRef = new Firebase("https://native-ads.firebaseio.com/"),
    running_Ref = rootRef.child('running');

// Get the UUID from the cookies.
doc_cookie = document.cookie;
// The UUID is the slice from index 0 to the index of the first semicolon (';')
var exp_id = doc_cookie.slice(doc_cookie.indexOf('uuid=') + 'uuid='.length, doc_cookie.indexOf('uuid=') + 'uuid='.length + 36);


manage_experiment(exp_id);


console.log("exp_id: " + exp_id)

var exp_Ref = running_Ref.child(exp_id),
    act_Ref = exp_Ref.child('activity'),
    current_exp = "";

// Add this page to the activity log.
act_Ref.child('' + Date.now()).set(window.location.pathname);

// This is a callback
exp_Ref.once('value', function(snapshot) {
    current_exp = snapshot.val();
    console.log(current_exp);
    // Add activity to FB.
    // This likely doesn't need to be here. I don't need to reference the info, I can just push new shit. The only time I'll need to access the experiments info is when I move it from 'running' to 'logged'.
});

function stop_experiment(experiment) {
    logged_Ref = rootRef.child('logged');
    // Take the experiment from running ....
}







// Code Below: Uses the URL Args (?id=genUUID();)

// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//         results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

// var rootRef = new Firebase("https://native-ads.firebaseio.com/"),
//     running_Ref = rootRef.child('running');

// // Check the id in the URL. Make sure that experiment is running.
// // Get experiment info by parsing URL and querying Firebase.
// var exp_id = getParameterByName('id'),
//     exp_Ref = running_Ref.child(exp_id),
//     act_Ref = exp_Ref.child('activity'),
//     current_exp = "";

// // Add this page to the activity log.
// act_Ref.child('' + Date.now()).set(window.location.pathname);

// // This is a callback
// exp_Ref.once('value', function(snapshot) {
//     current_exp = snapshot.val();
//     console.log(current_exp);
//     // Add activity to FB.
//     // This likely doesn't need to be here. I don't need to reference the info, I can just push new shit. The only time I'll need to access the experiments info is when I move it from 'running' to 'logged'.
// });

// function stop_experiment(experiment) {
//     logged_Ref = rootRef.child('logged');
//     // Take the experiment from running ....
// }