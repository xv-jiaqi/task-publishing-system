// 处理删除电影数据的逻辑
$(() => {
    $('.del').click((e) => {
        let target = $(e.target);
        let id = target.data('id');
        let tr = $('.item-id-' + id);

        $.ajax({
            type: 'DELETE', // 异步请求类型：删除
            url: '/list?id=' + id,
        })
            .done((results) => {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
            });
    });
});