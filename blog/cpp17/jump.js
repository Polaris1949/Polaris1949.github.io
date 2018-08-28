function dest_clause(clause)
{
    var dest = "";

    if (is_numstr(clause))
    {
        dest += "c";
        dest += clause;
    }
    else
    {
        dest += "a";
        if (clause.length > 1)
            message("warning: only first character affected; remaining ignored [c=]");
        dest += clause[0].toLowerCase().charCodeAt() - 'a'.charCodeAt() + 1;
    }

    return dest;
}

function dest_subclause(subclause)
{
    var dest = "";

    if (!empty(subclause))
    {
        dest += "#s";
        dest += subclause;
    }

    return dest;
}

function jump()
{
    var str = location.search;
    var clause = "";
    var subclause = "";
    var lang = "";
    var loc = "";
    var dest = "";
    var debug = false;
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
            case "d": debug = arg; break;
            case "g": lang = arg; break;
            case "l": loc = arg; break;
            case "s": subclause = arg; break;
            default: message("warning: unknown option ignored [" + par + "=]"); break;
        }
    }

    debug = boolstr(debug);

    if (!empty(loc))
    {
        if (!empty(clause) || !empty(subclause))
            message("warning: redundant location; clause and subclause ignored [l=]");

        tmp = loc.split('.');
        clause = tmp[0];
        subclause = tmp[1];

        for (var i = 2; i < tmp.length; ++i)
        {
            subclause += ".";
            subclause += tmp[i];
        }

        dest += dest_clause(clause);
        dest += dest_subclause(subclause);
    }
    else if (!empty(clause))
    {
        dest += dest_clause(clause);
        dest += dest_subclause(subclause);
    }
    else if (!empty(subclause))
        message("error: clause not found but subclause found [s=]");

    if (!empty(dest))
    {
        dest = lang_check(dest, lang);
        message("note: jump to " + dest);

        if (debug)
        {
            message("note: jump prohibited in debug mode [d=]");
            message("note: bad language support in debug mode [d=]");
        }
        else do_jump(dest);
    }
    else
        message("error: no destination");
}
