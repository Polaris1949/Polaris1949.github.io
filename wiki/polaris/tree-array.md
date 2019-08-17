# Tree array library

## Header
```cpp
#include <polaris/tree_array>
```

## Struct `tree_array_mode`
### Synopsis
```cpp
struct tree_array_mode;
```

### TODO
- [ ] TODO

## Class template `tree_array`
### Synopsis
```cpp
template<typename Tp, typename Mode>
class tree_array;
```

### TODO
- [ ] TODO

## Example 1
```cpp
// Luogu P3374
#include <iostream>
#include <vector>
#include <polaris/tree_array>

pol::tree_array<int, pol::tree_array_mode::mpir> a;

int main()
{
    int i, n, m, o, x, y;
    std::cin >> n >> m;

    {
        std::vector<int> v;
        v.resize(n);

        for (i=0; i<n; ++i)
            std::cin >> v[i];

        a.init(v);
    }

    for (i=0; i<m; ++i)
    {
        std::cin >> o >> x >> y;
        if (o==1) a.modify(--x, y);
        else std::cout << a.inquire(--x, y) << '\n';
    }

    return 0;
}
```

## Example 2
```cpp
// Luogu P3368
#include <iostream>
#include <vector>
#include <polaris/tree_array>

pol::tree_array<int, pol::tree_array_mode::mrip> a;

int main()
{
    int i, n, m, o, x, y, k;
    std::cin >> n >> m;

    {
        std::vector<int> v;
        v.resize(n);

        for (i=0; i<n; ++i)
            std::cin >> v[i];

        a.init(v);
    }

    for (i=0; i<m; ++i)
    {
        std::cin >> o;

        if (o==1)
        {
            std::cin >> x >> y >> k;
            a.modify(--x, y, k);
        }
        else
        {
            std::cin >> x;
            std::cout << a.inquire(--x) << '\n';
        }
    }

    return 0;
}
```
