// Check whether an object is empty.
function empty(obj)
{
    return obj == undefined || obj.length <= 0;
}

// Issue a message.
function message(str)
{
    document.getElementById("msg").innerHTML += "<p>" + str + "</p>";
}

// Issue something.
function issue(type, str, opt, is_issue, is_opt)
{
    if (empty(is_issue)) is_issue = true;
    if (empty(is_opt)) is_opt = !empty(opt);

    if (is_issue)
    {
        var tmp = type + ": " + str;
        if (is_opt) tmp += " [" + opt + "=]";
        message(tmp);
    }
}

// Issue a fatal error.
function fatal_error(str, opt, _, is_opt)
{
    issue("fatal error", str, opt, true, is_opt);
}

// Issue an error.
function error(str, opt, is_error, is_opt)
{
    issue("error", str, opt, is_error, is_opt);
}

// Issue a warning.
function warning(str, opt, is_warn, is_opt)
{
    issue("warning", str, opt, is_warn, is_opt);
}

// Issue a note.
function note(str, opt, is_note, is_opt)
{
    issue("note", str, opt, is_note, is_opt);
}

// Check whether a string is made of number characters
function is_numstr(str)
{
    if (empty(str)) return false;
    var reg = /^\d+(\d+)?$/;
    return reg.test(str);
}

// Convert a string to a boolean.
function boolstr(str)
{
    if (empty(str)) return false;
    return str != "false" && str != "0";
}

// Do jump action.
function do_jump(url)
{
    window.location.href = url;
}
