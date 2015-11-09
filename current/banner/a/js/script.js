var btnBack = document.getElementById('back'),
    btnForward = document.getElementById('forward');


btnBack.addEventListener('click', function () {
    window.history.back();
})
btnForward.addEventListener('click', function () {
    window.history.forward();
})