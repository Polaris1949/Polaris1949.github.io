function empty(obj)
{
    return obj == undefined || obj.length <= 0;
}

function message(obj)
{
    document.getElementById("msg").innerHTML += "<p>" + obj + "</p>";
}

function is_numstr(obj)
{
    if (empty(obj)) return false;
    var reg = /^\d+(\d+)?$/;
    return reg.test(obj);
}

function boolstr(str)
{
    if (empty(str)) return false;
    return str != "false" && str != "0";
}

function do_jump(url)
{
    window.location.href = url;
}
