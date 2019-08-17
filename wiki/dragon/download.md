# Download library
There is a convenient download library in the Dragon repository, `libdnl`.

## Prerequisites
- You should have installed the command program `curl` with a high enough version.
- You should have installed a C++17 compiler.

## Features
- [x] Download Task (*Partial*)
    - [x] File to file
    - [ ] File to directory
- [x] Download Manager (*Partial*)
    - [x] Execution operations
    - [ ] Execution error code
- [ ] UI Interface
    - [ ] List
    - [ ] Progress

## Getting started
- [ ] TODO

## Example
```cpp
#include <libdnl.h>
#define URL_ROOT "http://res.17roco.qq.com/res/combat/"

int main()
{
    dnl::manager mgr;

    // Task #1
    mgr.push(dnl::task{URL_ROOT "previews/11698-idle.swf", "~/0.swf"});

    // Task #2
    mgr.push(dnl::task{URL_ROOT, "~/403.txt"});

    // Task #3
    mgr.push(dnl::task{URL_ROOT "previews/0-idle.swf", "~/404.swf"});

    // Only execute #1 and #2, then exit because of a 403 error in #2
    mgr.execute();

    // Task #4
    mgr.push(dnl::task{URL_ROOT "spirits/11698-.swf", "~/1.swf"});

    // Execute all remaining tasks, no matter there was a 404 error in #3
    mgr.execute_all();
}
```
