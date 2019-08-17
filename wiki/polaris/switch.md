# Switch library
This library provides facilities to substitute for old selective structures (i.e. if-else and switch-case).

## Requirements
### Compiler
- Variadic templates (C++11)
- Return type deduction for normal functions (C++14)
- constexpr if (C++17)
### Polaris libraries
- [Type traits library](Type-traits)

## Functions
### `switch_case`
```cpp
template<typename _Tp, typename _Up, typename... _Vp>
auto
switch_case(_Tp&& __switch, _Up&& __default, _Vp&&... __case);
```
- *Effects*: Invokes a function in a selective structure.
- *Requires*: Types of `__default` and functions in `__case` should be *Invocable*, and return types of invoking them should be *Same*.
- *Returns*: A value or `void`, depending on invoked function.
- *Throws*: Any exception thrown by invoked function.
- *Remarks*: Compare old selective structure and invocation of this function in the example below:
```cpp
std::size_t score;
std::cin >> score;

// Old selective structure
if (score >= 90) std::cout << 'A';
else if (score >= 80) std::cout << 'B';
else if (score >= 60) std::cout << 'C';
else std::cout << 'D';
std::cout << '\n';

// Invocation of this function
std::cout << pol::switch_case([] { return 'D'; },
    std::make_tuple(true, [] { return 'A'; }, [](auto&& v) { return v >= 90; }),
    std::make_tuple(true, [] { return 'B'; }, [](auto&& v) { return v >= 80; }),
    std::make_tuple(true, [] { return 'C'; }, [](auto&& v) { return v >= 60; }))
    << '\n';
```

### `one_of`
```cpp
template<typename _Tp, typename... _Up>
bool
one_of(_Tp&& __value, std::tuple<_Up...>&& __tuple);
```
- *Effects*: Checks whether a value is in a `std::tuple`.
- *Requires*: `_Tp` should be *EqualityComparable*, if there is any value of type `_Tp` in `__tuple`.
- *Returns*: `true` if a value is in `__tuple`, `false` otherwise.
- *Throws*: Any exception thrown by comparing `_Tp`, if comparison is necessary.
- *Remarks*: `_Tp` is not necessary to be *EqualityComparableWith* any type different from it.

## Implementation functions
### `__switch_impl` (0)
```cpp
template<typename _Tp, typename _Up>
auto
__switch_impl(_Tp&& __switch, _Up&& __default);
```
- *Effects*: Invokes default function `__default` in a selective structure.
- *Requires*: `_Up` should be *Invocable*.
- *Returns*: A value or `void`, depending on what `__default()` returns.
- *Throws*: Any exception thrown by invoking `__default()`.
- *Remarks*: Parameter `__switch` is unused here.

### `__switch_impl` (1)
```cpp
template<typename _Tp, typename _Up, typename... _Vp,
         typename _Ap, typename _Bp>
auto
__switch_impl(_Tp&& __switch, _Up&& __default,
              std::pair<_Ap, _Bp>&& __cur, _Vp&&... __case);
```

### `__switch_impl` (2)
```cpp
template<typename _Tp, typename _Up, typename... _Vp,
         typename... _Ap, typename _Bp>
auto
__switch_impl(_Tp&& __switch, _Up&& __default,
              std::pair<std::tuple<_Ap...>, _Bp>&& __cur, _Vp&&... __case);
```

### `__switch_impl` (3)
```cpp
template<typename _Tp, typename _Up, typename... _Vp,
         typename _Ap, typename _Bp, typename _Cp>
auto
__switch_impl(_Tp&& __switch, _Up&& __default,
              std::tuple<_Ap, _Bp, _Cp>&& __cur, _Vp&&... __case);
```

### `__switch_impl` (4)
```cpp
template<typename _Tp, typename _Up, typename... _Vp,
         typename... _Ap, typename _Bp, typename _Cp>
auto
__switch_impl(_Tp&& __switch, _Up&& __default,
              std::tuple<std::tuple<_Ap...>, _Bp, _Cp>&& __cur, _Vp&&... __case);
```

### `__one_of_impl` (0)
```cpp
template<std::size_t __i, typename _Tp, typename... _Up,
         typename = std::enable_if_t<(__i < sizeof...(_Up))>>
bool
__one_of_impl(_Tp&& __value, std::tuple<_Up...>&& __tuple);
```

### `__one_of_impl` (1)
```cpp
template<std::size_t __i, typename _Tp, typename... _Up,
         typename = std::enable_if_t<(__i >= sizeof...(_Up))>, typename = void>
bool
__one_of_impl(_Tp&& __value, std::tuple<_Up...>&& __tuple);
```
