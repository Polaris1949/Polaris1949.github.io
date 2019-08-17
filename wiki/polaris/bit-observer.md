# Bit observer library

## TODO list

## Introduction
- This library provides several utilities for observering the bit distribution in any variable, mostly `bit_observer`.
- Still in beta version. Impl & Wiki in flux.

## Header
```cpp
#include <polaris/bit_observer>
```

## Class `basic_bit_observer`

## Class template `bit_observer`
### Synopsis
```cpp
template<typename Tp>
class bit_observer;
```
- [ ] TODO

### Template parameter
- `Tp` denotes the type of stored data in which you need to observe the bit distribution.

## Example
Input a number of type `int` and output its bit distribution.
```cpp
#include <polaris/bit_observer>
#include <iostream>

int main()
{
    pol::bit_observer<int> x;
    std::cin >> x.data();
    std::cout << x << '\n';
    return 0;
}
```
