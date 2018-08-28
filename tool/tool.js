function jump1()
{
    var link = document.getElementById('link').value;
    while (link.length < 3) link = '0' + link;
    location.href = 'http://res.17roco.qq.com/res/combat/previews/' + link + '-idle.swf';
}

function jump2()
{
    var link = document.getElementById('link').value;
    while (link.length < 3) link = '0' + link;
    location.href = 'http://res.17roco.qq.com/res/combat/spirits/' + link + '-.swf';
}

function jump3()
{
    var link = document.getElementById('link').value;
    while (link.length < 3) link = '0' + link;
    location.href = 'http://res.17roco.qq.com/res/combat/icons/' + link + '-.png';
}

function jump4()
{
    var link = document.getElementById('link').value;
    location.href = 'http://res.17roco.qq.com/webapp/rocoBox/petIcon/' + link + '.png';
}
