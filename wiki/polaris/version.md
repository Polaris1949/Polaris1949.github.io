# Version library

## Header
```cpp
#include <pol/version>
```

## Macros
### `__POLLIB__`
- *Returns*: An integer of major version of header library.

### `__POLLIB_MINOR__`
- *Returns*: An integer of minor version of header library.

### `__POLLIB_PATCHLEVEL__`
- *Returns*: An integer of patchlevel version of header library.

### `__POL_VERSION`
- *Returns*: A C-style string of header library version.

## Function
### `version`
```cpp
const char*
version() noexcept;
```
- *Returns*: A C-style string of runtime library version.

## Example
```cpp
#include <pol/version>
#include <string>

int main()
{
    std::string header{__POL_VERSION};
    std::string runtime{pol::version()};

    if (header != runtime)
    {
        std::cout << "bad library\n";
        return 1;
    }
}
```
