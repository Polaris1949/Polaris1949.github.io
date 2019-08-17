# Link cut tree library

## Caveats
- The optimization level should be set at least `-O2`.
- Turn off synchronization with C I/O in C++ I/O when in OI.

## Header
```cpp
#include <polaris/link_cut_tree>
```

## Class template `link_cut_tree_node`
### Synopsis
```cpp
template<typename Tp>
class link_cut_tree_node;
```

### TODO
- [ ] TODO

## Class template `link_cut_tree`
### Synopsis
```cpp
template<typename Tp>
class link_cut_tree;
```

### TODO
- [ ] TODO

### Example
```cpp
// Luogu P3690
#include <iostream>
#include <vector>
#include <polaris/link_cut_tree>

pol::link_cut_tree<int> lct;

int main()
{
    int n, m, o, x, y;
    std::cin >> n >> m;

    {
        std::vector<int> v;
        v.resize(n);

        for (int i=0; i<n; ++i)
            std::cin >> v[i];

        lct.construct(v);
    }

    for (int i=0; i<m; ++i)
    {
        std::cin >> o >> x >> y;

        switch (o)
        {
            case 0: std::cout << lct.xor_sum(--x, --y) << '\n'; break;
            case 1: lct.link(--x, --y); break;
            case 2: lct.cut(--x, --y); break;
            case 3: lct.assign(--x, y); break;
        }
    }

    return 0;
}
```
