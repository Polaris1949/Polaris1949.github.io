function empty(obj)
{
    return obj == undefined || obj.length <= 0;
}

function jump()
{
    var str = location.search;
    var clause = "";
    var subclause = "";
    var loc = "";
    var dest = "";
    var tmp;
    str = str.substr(1);

    while (!empty(str))
    {
        tmp = str.split('&');
        var cur = tmp[0];
        str = tmp[1];
        tmp = cur.split('=');
        var par = tmp[0];
        var arg = tmp[1];

        switch (par)
        {
            case "c": clause = arg; break;
            case "s": subclause = arg; break;
            case "l": loc = arg; break;
            default: break;
        }
    }

    if (!empty(loc))
    {
        if (!empty(clause) || !empty(subclause))
            document.getElementById("msg").innerHTML += "<p>warning: redundant location; clause and subclause ignored</p>";

        tmp = loc.split('.');
        clause = tmp[0];
        subclause = tmp[1];

        dest = "c";
        dest += clause;

        if (!empty(subclause))
        {
            dest += "#s";
            dest += subclause;
        }
    }
    else if (!empty(clause))
    {
        dest = "c";
        dest += clause;

        if (!empty(subclause))
        {
            dest += "#s";
            dest += subclause;
        }
    }
    else if (!empty(subclause))
        document.getElementById("msg").innerHTML += "<p>error: clause not found but subclause found</p>";

    if (!empty(dest))
        window.location.href = dest;
    else
        document.getElementById("msg").innerHTML += "<p>error: no destination</p>";
}
