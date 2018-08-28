function lang_check(href, lang)
{
    console.warn(lang);
    if (empty(lang))
        lang = (navigator.browserLanguage || navigator.language).toLowerCase();
    var pos = href.lastIndexOf('/');
    var dest = "";

    switch (lang)
    {
        case "en-us": case "zh-cn": break;
        default: message("warning: language unsupported; en-us by default"); lang = "en-us"; break;
    }

    if (pos >= 0) dest += href.substr(0, pos) + '/' + lang + href.substr(pos);
    else dest += lang + '/' + href;
    return dest;
}

function lang_jump()
{
    do_jump(lang_check(window.location.href));
}
