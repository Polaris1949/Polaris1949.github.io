// Find clause destination.
function dest_clause(clause)
{
    var dest = "";

    if (is_numstr(clause))
        dest += "c" + clause;
    else
    {
        dest += "a";

        if (clause.length > 1)
            warning("only first character affected; remaining ignored", "c");

        dest += clause[0].toLowerCase().charCodeAt() - 'a'.charCodeAt() + 1;
    }

    return dest;
}

// Find subclause destination.
function dest_subclause(subclause)
{
    var dest = "";

    if (!empty(subclause))
        dest += "#s" + subclause;

    return dest;
}

// Jump action from search list.
function jump()
{
    var str = location.search;
    var clause = "";
    var subclause = "";
    var lang = "";
    var loc = "";
    var dest = "";
    var debug = false;
    str = str.substr(1);
    var arr = str.split('&');

    for (var i = 0; i < arr.length; ++i)
    {
        var cur = arr[i];
        var tmp = cur.split('=');
        var par = tmp[0];
        var arg = tmp[1];

        switch (par)
        {
            case "c": clause = arg; break;
            case "d": debug = boolstr(arg); break;
            case "g": lang = arg; break;
            case "l": loc = arg; break;
            case "s": subclause = arg; break;
            default: warning("unknown option ignored", par); break;
        }
    }

    if (empty(dest) && !empty(loc))
    {
        if (!empty(clause) || !empty(subclause))
            warning("redundant location; clause and subclause ignored", "l");

        var tmp = loc.split('.');
        clause = tmp[0];
        subclause = tmp[1];

        for (var i = 2; i < tmp.length; ++i)
            subclause += "." + tmp[i];

        dest += dest_clause(clause);
        dest += dest_subclause(subclause);
    }

    if (empty(dest) && !empty(clause))
    {
        dest += dest_clause(clause);
        dest += dest_subclause(subclause);
    }

    if (empty(dest) && !empty(subclause))
        error("clause not found but subclause found", "s");

    if (!empty(dest))
        dest = lang_check(dest, lang);
    else
    {
        dest = lang_check(dest, lang);
        dest = "";
    }

    if (empty(dest))
        fatal_error("no destination");
    else
    {
        note("jump to " + dest);

        if (debug) note("jump prohibited in debug mode", "d");
        else do_jump(dest);
    }
}
