function play()
{
    var str = location.search;
    var obj = '<object type="application/x-shockwave-flash" data="." width="100%" height="100%"></object>';
    str = str.substr(1);
    obj = obj.replace('.', str);
    document.getElementById('player').innerHTML += obj;
}

function jump()
{
    var link = document.getElementById('link').value;
    while (link.length < 3) link = '0' + link;
    location.href = 'player?' + link;
}
