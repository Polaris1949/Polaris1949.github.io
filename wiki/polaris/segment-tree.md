# Segment tree library

## Header
```cpp
#include <polaris/segment_tree>
```

## Class template `segment_tree_node`
### Synopsis
```cpp
template<typename Tp, typename MarkT>
class segment_tree_node;
```

### Template parameters
- `Tp` denotes a value type.
- `MarkT` denotes a mark type.

### Type aliases
```cpp
using value_type = Tp;
using mark_type = MarkT;
using node_type = segment_tree_node<Tp, MarkT>;
using size_type = std::size_t;
```

## Class specialization `segment_tree_node<Tp, void>`
### Synopsis
```cpp
template<typename Tp>
class segment_tree_node<Tp, void>;
```

## Class template `segment_tree`
### Synopsis
- [ ] TODO

### Constructors
```cpp
segment_tree();
```
- *Effects*: Constructs an empty `segment_tree`.

```cpp
template<typename Seq>
segment_tree(size_type begin, size_type end, const Seq& data);
```
- *Effects*: Constructs a `segment_tree` with the value of `data` from range `[l, r)`.
- *Requires*: `Seq` should be *Sequence*.

### Destructor
```cpp
~segment_tree() noexcept;
```
- *Effects*: Destroys a `segment_tree`.
- *Throws*: Nothing.

### Managing operations
```cpp
template<typename Seq>
tree_type& construct(size_type begin, size_type end, const Seq& data);
```
- *Effects*: Constructs a `segment_tree` with the value of `data` from range `[l, r)`.
- *Requires*: `Seq` should be *Sequence*.
- *Returns*: `*this`.
- *Remarks*: Original data (if any) would be destroyed.

```cpp
tree_type& destroy();
```
- *Effects*: Destroys all the data in a `segment_tree`.
- *Returns*: `*this`.

### Data member operations
```cpp
node_type*& root();
const node_type*& root() const;
```
- *Effects*: Gets root pointer.
- *Returns*: A root pointer (const) reference.

```cpp
value_type& infinite();
const value_type& infinite() const;
```
- *Effects*: Gets infinite value representation.
- *Returns*: A infinite value (const) reference.

```cpp
const data_func& data_functor() const;
```
- *Effects*: Gets data calculating functor.
- *Returns*: A data calculating functor const reference.
- *Remarks*: You cannot modify it, or the data structure would be invalid.

```cpp
size_type begin() const;
```
- *Effects*: Gets beginning boundary of range of a `segment_tree`.
- *Returns*: A beginning boundary.
- *Remarks*: The range of a `segment_tree` is like `[l, r)`.

```cpp
size_type end() const;
```
- *Effects*: Gets end boundary of range of a `segment_tree`.
- *Returns*: A end boundary.
- *Remarks*: The range of a `segment_tree` is like `[l, r)`.

### Node operations
```cpp
tree_type& push_up(node_type* pos);
```
- *Effects*: Updates value of node `pos` from its child nodes, using calculating functor.
- *Returns*: `*this`.

```cpp
template<typename MarkFunc>
tree_type& push_down(node_type* pos, const MarkFunc& mark);
```
- *Effects*: Pushes mark of node `pos` onto its child nodes, using mark functor `mark`.
- *Returns*: `*this`.

### Data structure operations
```cpp
template<typename MarkFunc>
value_type search(size_type begin, size_type end, const MarkFunc& mark);
```
- *Effects*: Searches value in range `[l, r)`, using calculating functor and mark functor `mark`.
- *Returns*: Searched value.

```cpp
template<typename ModifyFunc, typename MarkFunc>
tree_type& modify(size_type pos, const value_type& x,
                  const ModifyFunc& func, const MarkFunc& mark);
```
- *Effects*: Modifies value at position `pos`, using modify functor `func` and mark functor `mark`.
- *Returns*: `*this`.

```cpp
template<typename ModifyFunc, typename MarkFunc>
tree_type& modify(size_type begin, size_type end, const value_type& x,
                  const ModifyFunc& func, const MarkFunc& mark);
```
- *Effects*: Modifies value in range `[l, r)`, using modify functor `func` and mark functor `mark`.
- *Returns*: `*this`.

### Example
```cpp
// Luogu P3372
#include <vector>
#include <iostream>
#include <algorithm>
#include <polaris/segment_tree>

using llong = long long;

struct fsum_t
{
    llong operator() (llong x, llong y) const
    { return x+y; }
};

struct fmod_t
{
    using node_type = pol::segment_tree_node<llong, llong>;

    void operator() (node_type* root, llong x) const
    {
        root->data() += root->segment() * x;
        root->mark() += x;
    }
};

llong n, m;
std::vector<llong> v;
pol::segment_tree<llong, llong, fsum_t> stree;

int main()
{
    llong i, x, y, k, f;
    std::cin >> n >> m;
    v.resize(n);

    for (i=0; i<n; ++i)
        std::cin >> v[i];

    stree.construct(0, n, v);

    for (i=0; i<m; ++i)
    {
        std::cin >> f;

        if (f==1)
        {
            std::cin >> x >> y >> k;
            stree.modify(--x, y, k, fmod_t(), fmod_t());
        }
        else
        {
            std::cin >> x >> y;
            std::cout << stree.search(--x, y, fmod_t()) << '\n';
        }
    }

    return 0;
}
```
