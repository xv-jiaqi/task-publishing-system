window.onload = function () {
    let nodes = document.querySelectorAll('h3.status');
    let p = document.querySelector('h4.error-info');

    let timer = null;
    let time = 5;

    for(let i = 0, len = nodes.length; i < len; i++) {
        nodes[i].style.display = 'none';
    }

    timer = setInterval(function () {
        time--;
        p.innerHTML = `${time}秒后自动转入目标页面`;
        if (time < 1) {
            clearInterval(timer);

            switch (location.pathname){
                case '/ready':
                    window.location = '/list';
                    break;
                case '/signinerror':
                    window.location = '/login';
                    break;
                default:
                    history.back();
            }

        }
    }, 1000);
};