function get_exp_id() {
    // Get the UUID from the cookies.
    var doc_cookie = document.cookie;
    // The UUID is the slice from index 0 to the index of the first semicolon (';')
    return doc_cookie.slice(doc_cookie.indexOf('uuid=') + 'uuid='.length,
        doc_cookie.indexOf('uuid=') + 'uuid='.length + 36);
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


function get_next_path() {
    var next_path = '';
    var cur_path = window.location.pathname;
    var loc_parts = cur_path.split('/');

    // What condition is this?
    var cond = loc_parts[1];
    // What front_page are we on?
    var fp_id = loc_parts[2];

    if (fp_id == 'e') {
        // deleteAllCookies(); 
        next_path = '/';
    } else {
        var valid_fps = ['a', 'b', 'c', 'd', 'e'];
        // Get next fp_id
        var next_fp_id = valid_fps[valid_fps.indexOf(fp_id) + 1];
        next_path = '/' + cond + '/' + next_fp_id;
    }

    return next_path;
}


function iterate_experiment(current_exp) {
    console.log('iterate_experiment ... ');
    var exp_id = get_exp_id();
    // Check if iteration has finished.
    if (Date.now() >= current_exp.time_iteration_end) {
        var rootRef = new Firebase("https://native-ads.firebaseio.com/"),
            running_Ref = rootRef.child('running'),
            logged_Ref = rootRef.child('logged'),
            exp_Ref = running_Ref.child(exp_id),
            act_Ref = exp_Ref.child('activity');

        // Get info on where we're going next ...
        var next_path = get_next_path();

        alert("Moving to the next iteration! Please click 'ok' to continue.");

        // If we're about to end, shut it down properly
        if (next_path == '/') {
            current_exp.time_iteration_end = null;

            // Save current to logged and remove from running.
            logged_Ref.child(exp_id).set(current_exp);
            running_Ref.child(exp_id).remove(function() {
                window.location.href = next_path;
            });
        } else {
            
            // Add a new iteration end ...
            var iter_duration = (current_exp.duration * 1000 * 60) / 5;
            current_exp.time_iteration_end = Date.now() + iter_duration;
            exp_Ref.set(current_exp);

            window.location.href = next_path;
        }
    }
}


function manage_experiment() {
    // Check the time ...
    //    What's the time interval?
    var exp_id = get_exp_id();

    var rootRef = new Firebase("https://native-ads.firebaseio.com/"),
        running_Ref = rootRef.child('running'),
        logged_Ref = rootRef.child('logged'),
        exp_Ref = running_Ref.child(exp_id),
        act_Ref = exp_Ref.child('activity'),
        current_exp = '';

    // Add this page to the activity.
    act_Ref.child('' + Date.now()).set(window.location.pathname);


    // Callback
    exp_Ref.once('value', function(snap) {

        // Get current experiment object.
        current_exp = snap.val();


        // Check to see if there is an end time for this iteration.
        if (current_exp.time_iteration_end == undefined) {
            var iter_duration = (current_exp.duration * 1000 * 60) / 5;
            current_exp.time_iteration_end = Date.now() + iter_duration;
            exp_Ref.set(current_exp);

            console.log('updated time_iteration_end: ', current_exp.time_iteration_end);
        }

        console.log('current_exp: ', current_exp)

        // Start checking if we should iterate the experiment.
        setInterval(iterate_experiment, 500, current_exp);
    });
}



manage_experiment();
