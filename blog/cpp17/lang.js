// Check language and modify url.
function lang_check(href, lang)
{
    if (empty(lang))
        lang = (navigator.browserLanguage || navigator.language).toLowerCase();
    var pos = href.lastIndexOf('/');
    var dest = "";

    switch (lang)
    {
        case "en-us": case "zh-cn": break;
        default: warning("language unsupported; en-us by default", "g"); break;
    }

    if (pos >= 0) dest += href.substr(0, pos) + '/' + lang + href.substr(pos);
    else dest += lang + '/' + href;
    return dest;
}

// Language jump action.
function lang_jump()
{
    do_jump(lang_check(window.location.href));
}
