$(() => {
    $('#btn-submit').attr("disabled", "disabled");

    $('form :input').blur(function () {

        // 验证用户名
        if (this.id === 'username') {

            $prompt = $(this).parent().next();
            $prompt.removeClass('error correct');

            if (this.value === '' || this.value.length < 5 || this.value.length > 11) {
                $prompt.addClass('error').html('请输入5-11位的用户名！');
                return;
            } else {
                $prompt.addClass('correct').html(' OK');
            }

            // 请求验证用户名是否存在
            $.ajax({
                type: 'PUT',
                url: '/signup?userName=' + $(this).val()
            }).done((results) => {
                if (results.success === 1) {
                    $prompt.removeClass('correct');
                    $prompt.addClass('error').html('用户名已存在！');
                }
            });
        }

        // 验证密码是否符合规则
        if (this.id === 'password') {
            let count = 0,
                number = 0,
                upperCase = 0,
                lowerCase = 0;

            $prompt = $(this).parent().next();
            $prompt.removeClass('error correct');

            if (this.value.search(/[0-9]/) !== -1) {
                count += 1;
                number = 1;
            }
            if (this.value.search(/[A-Z]/) !== -1) {
                count += 1;
                upperCase = 1;
            }
            if (this.value.search(/[a-z]/) !== -1) {
                count += 1;
                lowerCase = 1;
            }
            if (count >= 2 && (this.value.length >= 6 && this.value.length <= 16)) {
                $prompt.addClass('correct').html(' OK');
            } else if (this.value.length < 6 || this.value.length > 16) {
                $prompt.addClass('error').html('密码由6-16个字符组成！');
            } else if (count === 1) {
                if (number === 1) {
                    $prompt.addClass('error').html('不能全为数字！');
                }
                if (upperCase === 1 || lowerCase === 1) {
                    $prompt.addClass('error').html('不能全为字母！');
                }
            }
        }

        // 验证确认密码和密码是否一致
        if (this.id === 'crm-password') {
            let password = $('#password').val();
            let confirmPassword = $('#crm-password').val();

            $prompt = $(this).parent().next();
            $prompt.removeClass('error correct');

            if (password !== '' && password === confirmPassword) {
                $prompt.addClass('correct').html(' OK');
            } else {
                $prompt.addClass('error').html('两次输入密码不一致！');
            }
        }

        if (this.id === 'pay-account') {

            $prompt = $(this).parent().next();
            $prompt.removeClass('error correct');

            if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.value) || /^1[34578]\d{9}$/.test(this.value)) {
                $prompt.addClass('correct').html(' OK');
            } else {
                $prompt.addClass('error').html('正确的收款账号应该为邮箱地址或手机号！');
            }
        }

        // 验证年龄
        if (this.id === 'birth') {

            $prompt = $(this).parent().next();
            $prompt.removeClass('error correct');

            let age = (new Date().getTime() - new Date(this.value).getTime()) / 1000 / 3600 / 24 / 365;

            if (this.value === '') {
                $prompt.addClass('correct').html('出生日期默认为「2000/1/1」号！');
            } else if (age < 0 || age > 150) {
                $prompt.addClass('error').html('年龄必须在0~150岁之间！');
            } else {
                $prompt.addClass('correct').html(' OK');
            }
        }

        // 有错误信息禁用提交按钮
        let numError = $('form .error').length;
        if (numError) {
            $('#btn-submit').attr("disabled", "disabled");
        } else {
            $('#btn-submit').removeAttr("disabled", "disabled");
        }
    });

    $('select').blur(function () {
        $(this).parent().next().addClass('correct').html(' OK');
    });

    // 重置按钮
    $('#btn-reset').click(function () {
        $('.prompt').removeClass('correct').html('');
    });
});