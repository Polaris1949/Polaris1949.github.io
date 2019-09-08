# Disjoint set library

## TODO list
- [ ] Implement node support for disjoint set (*Partial*)
    - [x] Class template `djset_data_node_base<Tp>`
    - [x] Class template `djset_data_node<Tp, Rank>`
    - [x] Class specialization `djset_data_node<Tp, void>`
    - [x] Class template `djset_iter_node_base<Tp>`
    - [ ] Class template `djset_iter_node<Tp, Rank>`
    - [ ] Class specialization `djset_iter_node<Tp, void>`
- [ ] Implement sequence-based disjoint set (*Partial*)
    - [x] Class template `seq_djset<Tp, Rank>`
    - [ ] Class specialization `seq_djset<Tp, void>`
- [ ] Implement tree-based disjoint set
    - [ ] Class template `tree_djset<Tp, Rank>`
    - [ ] Class specialization `tree_djset<Tp, void>`
- [ ] Implement hash-based disjoint set
    - [ ] Class template `hash_djset<Tp, Rank>`
    - [ ] Class specialization `hash_djset<Tp, void>`
- [ ] Complete wiki
    - [ ] Introduction (*Partial*)
    - [x] Header
    - [ ] Class template `seq_djset` (*Partial*)
    - [ ] Class template `tree_djset`
    - [ ] Class template `hash_djset`
    - [ ] Type aliases (*Partial*)
    - [x] Example
- [ ] TBD list
    - [ ] Make direct-access member functions non-public
    - [ ] Allow deprecated type aliases for `ufset`-series

## Introduction
- This library provides 3 different implementations for the disjoint set data structure, including `seq_djset`, `tree_djset` and `hash_djset`.
- Still in beta version. Impl & Wiki in flux.

## Header
```cpp
#include <pol/djset>
```

## Class template `seq_djset`
### Synopsis
```cpp
template<typename Tp, typename Rank>
class seq_djset
{
public:
    using value_type = Tp;
    using rank_type = Rank;
    using size_type = size_t;
    using node_type = djset_data_node<Tp, Rank>;

    seq_djset() = default;
    explicit seq_djset(size_type n);
    ~seq_djset() noexcept = default;

    void init(size_type n);
};
```
- [ ] TODO: Complete

### Template parameters
- `Tp` denotes a value type. It shall be *Integral* and satisfy the requirement that `sizeof(Tp) <= sizeof(size_t)`.
- `Rank` denotes a rank type. It shall be *Incrementable* and *Comparable*.

### Type aliases
```cpp
using value_type = Tp;
using rank_type = Rank;
using size_type = size_t;
using node_type = djset_data_node<Tp, Rank>;
using container_type = std::vector<node_type>;
```
- `value_type` denotes the value type.
- `rank_type` denotes the rank type.
- `size_type` denotes the size type.
- `node_type` denotes the node type.
- `container_type` denotes the container type.
- [ ] TODO

### Constructors
```cpp
seq_djset() = default;
```
- *Effects*: Constructs an empty `seq_djset`.

```cpp
explicit seq_djset(size_type n);
```
- *Effects*: Constructs an empty `seq_djset`, and initializes it with `n` default elements.

### Destructor
```cpp
~seq_djset() noexcept = default;
```
- *Effects*: Destroys a `seq_djset`.

### Member functions
```cpp
void init(size_type n);
```
- *Effects*: Initializes a `seq_djset` with `n` default elements.

```cpp
void clear() noexcept;
```
- *Effects*: Clears a `seq_djset`.

```cpp
value_type& parent(const value_type& x);
const value_type& parent(const value_type& x) const;
```
- *Effects*: Gets parent of `x`.
- *Returns*: A value.

```cpp
rank_type& rank(const value_type& x);
const rank_type& rank(const value_type& x) const;
```
- *Effects*: Gets rank of `x`.
- *Returns*: A rank.

```cpp
value_type& find(const value_type& x);
```
- *Effects*: Finds the most ancient parent of `x`.
- *Returns*: A value.

```cpp
bool merge(const value_type& x, const value_type& y);
```
- *Effects*: Merges two sets.
- *Returns*: `true` if merging takes place, `false` otherwise.

```cpp
bool is_sibling(const value_type& x, const value_type& y);
```
- *Effects*: Checks whether two values are in the same set.
- *Returns*: `true` if they are in the same set, `false` otherwise.

## Class template `tree_djset`
### Synopsis
```cpp
template<typename Tp, typename Rank>
class tree_djset;
```

### Template parameters
- `Tp` denotes a value type.
- `Rank` denotes a rank type.

### TODO
- [ ] TODO

## Class template `hash_djset`
### Synopsis
```cpp
template<typename Tp, typename Rank>
class hash_djset;
```

### Template parameters
- `Tp` denotes a value type.
- `Rank` denotes a rank type.

### TODO
- [ ] TODO

## Type aliases
### Synopsis
```cpp
using djset   = seq_djset<size_t,   size_t>;
using djset32 = seq_djset<uint32_t, uint32_t>;
using djset64 = seq_djset<uint64_t, uint64_t>;
```

## Example
A solution using the library for [Luogu P3367](https://www.luogu.org/problem/P3367).
```cpp
#include <iostream>
#include <pol/djset>

pol::djset u;

int main()
{
    std::size_t n, m, o, x, y;
    std::cin >> n >> m;
    u.init(n);

    for (std::size_t i{}; i < m; ++i)
    {
        std::cin >> o >> x >> y;
        --x; --y;
        if (o == 1) u.merge(x, y);
        else std::cout << (u.is_sibling(x, y) ? 'Y' : 'N') << '\n';
    }

    return 0;
}
```
