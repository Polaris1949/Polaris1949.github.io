function exp_a(x)
{
    if (x&1) return 3*x*x*x+30*x*x-15*x+198;
    else return 3*x*x*x+27*x*x-12*x+180;
}

function exp_a_ps(x)
{
    if (x&1) return 0.75*x*x*x*x+11*x*x*x+9*x*x+187*x+8.25;
    else return 0.75*x*x*x*x+11*x*x*x+7.5*x*x+187*x;
}

function exp_calc()
{
    var lvb = document.getElementById("lvb").value;
    var lve = document.getElementById("lve").value;
    if (!check_num(lvb) || !check_num(lve))
    {
        alert("Please input a number");
        return;
    }
    var exp = exp_a_ps(lve - 1) - exp_a_ps(lvb - 1);
    document.getElementById("exp").value = exp;
    document.getElementById("expl").value = 0;
}

function lv_calc()
{
    var lvb = document.getElementById("lvb").value;
    var exp = document.getElementById("exp").value;
    var lvmin = document.getElementById("lvmin").value;
    var lvmax = document.getElementById("lvmax").value;
    if (!check_num(lvb) || !check_num(exp) || !check_num(lvmin) || !check_num(lvmax))
    {
        alert("Please input a number");
        return;
    }
    var lve = lvb;
    while (lve < lvmax)
    {
        var t = exp_a(lve);
        if (exp - t >= 0)
        {
            exp -= t;
            ++lve;
        }
        else break;
    }
    document.getElementById("lve").value = lve;
    document.getElementById("expl").value = exp;
}

function check_num(x)
{ 
    var re = /^[0-9]+.?[0-9]*/;
    return re.test(x);
}