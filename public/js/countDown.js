/**
 * 页面倒计时
 */
$(() => {

    let $correct = $('h4.correct').html();

    let watching = setInterval(() => {
        if ($correct) {
            clearInterval(watching);
            countDown();
        }
    }, 100);

    function countDown() {
        let count = $correct.match(/\d/g)[0];

        let countDown = setInterval(() => {
            $('h4.correct').html($correct.replace(/\d/g, --count));
            if (count <= 0) {
                clearInterval(countDown);
                location.href = '/login';
            }
        }, 1000);
    }

});