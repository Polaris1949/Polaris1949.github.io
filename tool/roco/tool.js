function jump1()
{
    jumpx(1, 'https://res.17roco.qq.com/res/combat/previews/', '-idle.swf');
}

function jump2()
{
    jumpx(1, 'https://res.17roco.qq.com/res/combat/spirits/', '-.swf');
}

function jump3()
{
    jumpx(0, 'https://res.17roco.qq.com/res/combat/icons/', '-.png');
}

function jump4()
{
    jumpx(0, 'https://res.17roco.qq.com/webapp/rocoBox/petIcon/', '.png');
}

function jumpx(t, pre, suf)
{
    var num = document.getElementById('num').value;
    if (num !== '22')
        while (num.length < 3) num = '0' + num;
    if (document.getElementById('nsp').checked && (t == 1))
        pre = "../player?" + pre;
    location.href = pre + num + suf;
}

function autocheck()
{
    if (navigator.userAgent.indexOf('Edge') > -1)
        return;
    if (navigator.userAgent.indexOf('Chrome') > -1)
        document.getElementById('nsp').checked = "checked";
}