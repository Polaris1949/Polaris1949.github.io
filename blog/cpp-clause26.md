# 26 容器库
译注：翻译进行中。部分过长表格将在翻译完成后修订。将考虑构建英文修订版本。

## 26.1 简介
- <sup>1</sup> 本节描述C++程序中可以用来组织信息收集的组件。
- <sup>2</sup> 下面几节描述了容器的要求，以及序列容器和关联容器的组件，总结在表82中。 

<p id="table82"><center>表82——容器库总结</center></p>

|子章节|头文件|
|-|-|
|[26.2](#) 要求||
|[26.3](#) 序列容器|`<array>`<br/>`<deque>`<br/>`<forward_list>`<br/>`<list>`<br/>`<vector>`|
|[26.4](#) 关联容器|`<map>`<br/>`<set>`|
|[26.5](#) 无序关联容器|`<unordered_map>`<br/>`<unordered_set>`|
|[26.6](#) 容器适配器|`<queue>`<br/>`<stack>`|


## 26.2 容器要求
### 26.2.1 容器要求简介
- <sup>1</sup> 容器是存储其它对象的对象。它们通过构造函数、析构函数、插入和删除操作来控制这些对象的分配和释放。
- <sup>2</sup> 本节中所有的复杂度要求仅以包含对象的操作数表示。[*例：*类型`vector<vector<int>>`的构造函数有线性复杂度，即使拷贝每个包含的`vector<int>`的复杂度本身就是线性的。*——例结束*]
- <sup>3</sup> 本节中的组件都声明了一个`allocator_type`，存储在这些组件中的对象应使用`allocator_traits<allocator_type>::rebind_traits<U>::construct`函数构造并使用`allocator_traits<allocator_type>::rebind_traits<U>::destroy`函数销毁（[23.10.8.2](#)），且`U`是`allocator_type::value_type`或一种容器使用的内置类型。这些函数仅为容器的元素类型调用，不为容器使用的内置类型调用。[*注：*这意味着，例如，基于节点的容器可能需要构造包含对齐缓冲区的节点，并调用`construct`将元素放置到缓冲区中。*——注结束*]
- <sup>4</sup> 在表[83](#)、[84](#)和[85](#)中，`X`表示一个包含对象类型为`T`的容器类，`a`和`b`表示类型为`X`的值，`u`表示一个标识符，`r`表示类型`X`的一个非常量值，`rv`表示类型`X`的一个非常量右值。

<p id="table83"><center>表83——容器要求</center></p>

|表达式|返回类型|操作<br/>语义|断言/说明<br/>前置/后置条件|复杂度|
|-|-|-|-|-|
|`X::value_type`|`T`||*要求：*`T`从`X`中是`Erasable`（见[26.2.1](#)下方）|编译时|
|`X::reference`|`T&`|||编译时|
|`X::const_reference`|`const T&`|||编译时|
|`X::iterator`|值类型为`T`的迭代器类型||任何满足前向迭代器的迭代器类别。<br/>可转换为`X::const_iterator`。|编译时|
|`X::const_iterator`|值类型为`T`的常量迭代器类型||任何满足前向迭代器的迭代器类别。|编译时|
|`X::difference_type`|有符号整数类型||与`X::iterator`和`X::const_iterator`的差距类型相同|编译时|
|`X::size_type`|无符号整数类型||`size_type`能表示`difference_type`的任意非负值|编译时|
|`X u;`|||*后置条件：*`u.empty()`|常量|
|`X()`|||*后置条件：*`X().empty()`|常量|
|`X(a)`|||*要求：*`T`到`X`中`CopyInsertable`（见下）。<br/>*后置条件：*`a == X(a)`|线性|
|`X u(a);`<br/>`X u = a;`|||*要求：*`T`到`X`中`CopyInsertable`（见下）。<br/>*后置条件：*`u == a`|线性|
|`X u(rv);`<br/>`X u = rv;`|||*后置条件：*`u`应与在此次构造前`rv`拥有的值相等|（说明B）|
|`a = rv`|`X&`|`a`存在的所有元素被移动赋值或销毁|`a`应与在此次赋值前`rv`拥有的值相等|线性|
|`(&a)->~X()`|`void`||析构函数被应用于`a`的每一个元素；任何获得的内存被释放|线性|
|`a.begin()`|`iterator`；对常量`a`是`const_iterator`|||常量|
|`a.end()`|`iterator`；对常量`a`是`const_iterator`|||常量|
|`a.cbegin()`|`const_iterator`|`const_cast<X const&>`<br/>`(a).begin();`||常量|
|`a.cend()`|`const_iterator`|`const_cast<X const&>`<br/>`(a).end();`||常量|
|`a == b`|可转换为`bool`|`==`是一种相等关系。<br/>`equal(a.begin(), `<br/>`a.end(), `<br/>`b.begin(), `<br/>`b.end())`|*要求：*`T`为`EqualityComparable`|若`a.size() `<br/>`!= b.size()`<br/>则为常量，否则为线性|
|`a != b`|可转换为`bool`|相当于`!(a == b)`||线性|
|`a.swap(b)`|`void`||交换`a`和`b`的内容|（说明A）|
|`swap(a, b)`|`void`|`a.swap(b)`||（说明A）|
|`r = a`|`X&`||*后置条件：*`r == a`|线性|
|`a.size()`|`size_type`|`distance(a.begin(), `<br/>`a.end())`||常量|
|`a.max_size()`|`size_type`|对最大可能容器的<br/>`distance(a.begin(), `<br/>`a.end())`||常量|
|`a.empty()`|可转换为`bool`|`a.begin() == a.end()`||常量|


- 那些标记了“（说明A）”或“（说明B）”的条目对于`array`有线性复杂度，对于所有其它标准容器有常量复杂度。[*注：*算法`equal()`在第[28](#)章中定义。*——注结束*]
- <sup>5</sup> 成员函数`size()`返回容器中的元素个数。元素个数被构造函数、插入和删除的规则所定义。
- <sup>6</sup> `begin()`返回一个指向容器中首元素的迭代器，`end()`返回一个容器的逾尾值的迭代器。如果容器为空，那么`begin() == end()`。
- <sup>7</sup> 在下列表达式中：
```cpp
i == j
i != j
i < j
i <= j
i >= j
i > j
i - j
```
- 当`i`和`j`表示容器的`iterator`类型的对象，其中一个或两个都可以被指向同一个元素且在语义上没有变化的容器的`const_iterator`类型的对象替换。
- <sup>8</sup> 除非另有说明，在本章节中定义的所有容器都使用分配器获得内存（见[20.5.3.5](#)）。[*注：*特别地，容器和迭代器不存储对分配元素的引用而是通过分配器的指针类型，即，作为`P`类型对象或`pointer_traits<P>::template rebind<未指定>`，且`P`为`allocator_traits<allocator_type>::pointer`。*——注结束*]这些容器类型的复制构造函数通过调用属于被复制的容器的分配器的`allocator_traits<allocator_type>::select_on_container_copy_construction`获得一个分配器。移动构造函数通过属于被移动容器的分配器的移动构造获得一个分配器。此类分配器的移动构造不应通过异常退出。这些容器类型的所有其它构造函数带有一个`const allocator_type&`参数。[*注：*如果构造函数的调用使用可选的分配器参数的默认值，那么`Allocator`类型必须支持值初始化。*——注结束*]在每个容器对象的生命周期中或直到分配器被替换为止，此分配器的副本用于由这些构造函数和所有成员函数执行的任何内存分配和元素构造。分配器只能通过赋值或`swap()`来替换。只要在相应容器的实现中，`allocator_traits<allocator_type>::propagate_on_container_copy_assignment::value`、<br/>`allocator_traits<allocator_type>::propagate_on_container_move_assignment::value`或`allocator_traits<allocator_type>::propagate_on_container_swap::value`为真，分配器替换通过复制赋值、移动赋值或分配器的交换来执行。在本章定义的所有容器类型中，成员`get_allocator()`返回一个用于构造容器的分配器的副本，或如果该分配器已被替换，则是最近替换的副本。
- <sup>9</sup> 表达式`a.swap(b)`，对于除`array`外标准容器类型的容器`a`和`b`，应在不调用任何单个容器元素的移动、复制或交换操作的情况下，交换`a`和`b`的值。任何属于`a`和`b`的`Compare`、`Pred`或`Hash`类型的左值应是可交换的，应通过调用描述在[20.5.3.2](#)中的`swap`来被交换。如果`allocator_traits<allocator_type>::propagate_on_container_swap::value`为真，那么`allocator_type`类型的左值应是可交换的，且`a`和`b`的分配器也应通过调用描述在[20.5.3.2](#)中的`swap`来被交换。否则，分配器不应被交换，且行为是未定义的，除非`a.get_allocator() == b.get_allocator()`。每一个在交换前指向一个容器中元素的迭代器都应在交换后指向另一个容器中的同一元素。在交换前，值为`a.end()`的迭代器是否拥有交换后的值`b.end()`是不确定的。
- <sup>10</sup> 如果容器的迭代器类型属于双向或随机访问迭代器类别（[27.2](#)），则称该容器为*可逆*的，并满足表[84](#)中的附加要求。

<p id="table84"><center>表84——可逆容器要求</center></p>

|表达式|返回类型|断言/说明<br/>前置/后置条件|复杂度|
|-|-|-|-|
|`X::reverse_iterator`|值类型为`T`的迭代器类型|`reverse_iterator<iterator>`|编译时|
|`X::const_reverse_iterator`|值类型为`T`的常量迭代器类型|`reverse_iterator<const_iterator>`|编译时|
|`a.rbegin()`|`reverse_iterator`；对常量`a`是<br/>`const_reverse_iterator`|`reverse_iterator(end())`|常量|
|`a.rend()`|`reverse_iterator`；对常量`a`是<br/>`const_reverse_iterator`|`reverse_iterator(end())`|常量|
|`a.crbegin()`|`const_reverse_iterator`|`const_cast<X const&>(a).rbegin()`|常量|
|`a.crend()`|`const_reverse_iterator`|`const_cast<X const&>(a).rend()`|常量|


- <sup>11</sup> 除非另有规定（见[26.2.6.1](#)、[26.2.7.1](#)、[26.3.8.4](#)和[26.3.11.5](#)），本节中定义的所有容器类型满足以下附加要求：
- <sup>(11.1)</sup> ——当插入单个元素时，如果异常被`insert()`或`emplace()`函数抛出，此函数无作用。
- <sup>(11.2)</sup> ——如果异常被`push_back()`、`push_front()`、`emplace_back()`或`emplace_front()`函数抛出，此函数无作用。
- <sup>(11.3)</sup> ——`erase()`、`clear()`、`pop_back()`或`pop_front()`函数不抛出异常。
- <sup>(11.4)</sup> ——复制构造函数或返回的迭代器的赋值操作符不抛出异常。
- <sup>(11.5)</sup> ——`swap()`函数不抛出异常。
- <sup>(11.6)</sup> ——`swap()`函数不使指向被交换容器元素的引用、指针或迭代器失效。[*注：*因为`end()`迭代器不指向任何元素，所以它可能会失效。*——注结束*]
- <sup>12</sup> 除非另有规定（明确地或通过其他函数定义一个函数），调用容器成员函数或将容器作为参数传递给库函数，不应使指向容器中对象的迭代器失效或改变容器中对象的值。
- <sup>13</sup> *连续容器*是支持随机访问迭代器且成员类型`iterator`和`const_iterator`为连续迭代器的容器。
- <sup>14</sup> 表[85](#)列出了为某些容器类型而不是其它类型提供的操作。提供所列出操作的容器应实现表[85](#)中描述的语义，除非另有说明。

<p id="table85"><center>表85——可选容器操作</center></p>

|表达式|返回类型|操作<br/>语义|断言/说明<br/>前置/后置条件|复杂度|
|-|-|-|-|-|
|`a < b`|可转换为`bool`|`lexicographical_compare(a.begin(), `<br/>`a.end(), b.begin(), b.end())`|*要求：*`<`被`T`的值定义。`<`是一种全序关系。|线性|
|`a > b`|可转换为`bool`|`b < a`||线性|
|`a <= b`|可转换为`bool`|`!(a > b)`||线性|
|`a >= b`|可转换为`bool`|`!(a < b)`||线性|


- [*注：*算法`lexicographical_compare()`在第[28](#)章中定义。*——注结束*]
- <sup>15</sup> 除`array`外，本章和[24.3.2](#)中定义的容器满足表[86](#)中描述的分配器可感容器的附加要求。
- 给定分配器类型`A`，给定具有与`T`相同的`value_type`和与`allocator_traits<A>::rebind_alloc<T>`相同的分配器类型的容器类型`X`，给定`A`类型的左值`m`、`T*`类型的指针`p`、`T`（可能为`const`）类型的表达式`v`和`T`类型的右值`rv`，定义以下术语。如果`X`不是分配器可感的，下面的术语被定义就像`A`是`allocator<T>`一样——无需创建任何分配器对象，且`allocator<T>`的用户特化不被实例化：
- <sup>(15.1)</sup> ——`T`到*`X`*中是*`DefaultInsertable`*，意味着下列表达式是规范的：
```cpp
allocator_traits<A>::construct(m, p)
```
- <sup>(15.2)</sup> ——如果`X`的元素被此表达式的赋值初始化，它是*默认插入的*，
```cpp
allocator_traits<A>::construct(m, p)
```
- 其中`p`为元素分配在`X`中未初始化的存储地址。
- <sup>(15.3)</sup> ——`T`到`X`中是`MoveInsertable`，意味着下列表达式是规范的：
```cpp
allocator_traits<A>::construct(m, p, rv)
```
- 且它的赋值导致以下后置条件存在：在赋值前，`*p`的值等于`rv`的值。[*注：*`rv`仍是一个有效对象。它的状态是不确定的。*——注结束*]
- <sup>(15.4)</sup> ——`T`到`X`中是`CopyInsertable`，意味着除`T`是`MoveInsertable`到`X`中外，下列表达式是规范的：
```cpp
allocator_traits<A>::construct(m, p, v)
```
- 且它的赋值导致以下后置条件存在：`v`的值未改变且等于`*p`。
- <sup>(15.5)</sup> `T`从`args`到`X`中是`EmplaceInsertable`，对于零个或更多参数的`args`，意味着下列表达式是规范的：
```cpp
allocator_traits<A>::construct(m, p, args)
```
- <sup>(15.6)</sup> `T`从`X`中是`Erasable`，意味着下列表达式是规范的：
```cpp
allocator_traits<A>::destroy(m, p)
```
- [*注：*容器调用`allocator_traits<A>::construct(m, p, args)`来使用`args`构造在`p`位置的元素，其中`m == get_allocator()`。`allocator`中的默认`construct`将调用`::new((void*)p) T(args)`，但特化的分配器可以选择一个不同的定义。*——注结束*]
- <sup>16</sup> 在表[86](#)中，`X`表示一个`value_type`为`T`且使用`A`类型分配器的分配器可感的容器类，`u`表示一个变量，`a`和`b`表示`X`类型的非常量左值，`t`表示`X`类型的一个左值或常量右值，`rv`表示`X`类型的一个非常量右值，且`m`是`A`类型的值。

<p id="table86"><center>表86——分配器可感容器要求</center></p>

|表达式|返回类型|断言/说明<br/>前置/后置条件|复杂度|
|-|-|-|-|
|`allocator_type`|`A`|*要求：*`allocator_type::value_type`与`X::value_type`相同。|编译时|
|`get_allocator()`|`A`||常量|
|`X()`<br/>`X u;`||*要求：*`A`是`DefaultConstructible`。<br/>*后置条件：*`u.empty()`返回`true`，`u.get_allocator() == A()`|常量|
|`X(m)`<br/>`X u(m);`||*后置条件：*`u.empty()`返回`true`，`u.get_allocator() == m`|常量|
|`X(t, m)`<br/>`X u(t, m);`||*要求：*`T`到`X`中是`CopyInsertable`。<br/>*后置条件：*`u == t`，`u.get_allocator() == m`|线性|
|`X rv`<br/>`X u(rv);`||*后置条件：*在构造前，`u`应有与`rv`相同的元素；在构造前，<br/>`u.get_allocator()`的值应与`rv.get_allocator()`的值相同。|常量|
|`X(rv, m)`<br/>`X u(rv, m);`||*要求：*`T`到`X`中是`MoveInsertable`。<br/>*后置条件：*在构造前，`u`应与`rv`有相同的元素或其副本，<br/>`u.get_allocator() == m`|若`m == rv.get_`<br/>`allocator()`则为常<br/>量，否则为线性|
|`a = t`|`X&`|*要求：*`T`到`X`中是`CopyInsertable`且`CopyAssignable`。<br/>*后置条件：*`a == t`|线性|
|`a = rv`|`X&`|*要求：*若`allocator_traits<allocator_type>::`<br/>`propagate_on_container_move_assignment::value`为`false`，<br/>`T`到`X`中是`MoveInsertable`且`MoveAssignable`。<br/>`a`的所有存在元素被移动赋值或销毁。<br/>*后置条件：*在赋值前，`a`应等于`rv`的值|线性|
|`a.swap(b)`|`void`|交换`a`和`b`的内容|常量|


- <sup>17</sup> 某些容器的成员函数和推导影响行为取决于类型是否规定为输入迭代器或分配器。实现决定一个类型不能为输入迭代器的程度是不确定的，除非最小整数类型不符合输入迭代器的标准。同样地，一个实现决定一个类型不能是一个分配器的程度是不确定的，除非作为一个最小类型`A`不符合分配器的条件，除非它满足以下两个条件：
- <sup>(17.1)</sup> ——*限定标识符*`A::value_type`是有效的并表示一个类型（[17.8.2](#)）。
- <sup>(17.2)</sup> ——当视为一个未赋值的表达式时，表达式`declval<A&>().allocate(size_t{})`是合法的。

### 26.2.2 容器数据竞争
- <sup>1</sup> 为了避免数据竞争（[20.5.5.9](#)），实现应考虑以下函数为`const`：`begin`、`end`、`rbegin`、`rend`、`front`、`back`、`data`、`find`、`lower_bound`、`upper_bound`、`equal_range`、`at`，及除了关联或无序关联容器之外的`operator[]`。
- <sup>2</sup> 虽然[20.5.5.9](#)，但是当同一容器中不同元素中包含的对象的内容同时修改时，实现需要避免数据竞争，`vector<bool>`除外。
- <sup>3</sup> [注：对于一个有大于一个大小的`vector<int> x`，`x[1] = 5`和`*x.begin() = 10`可以在没有数据竞争的情况下同时执行，但是`x[0] = 5`和`*x.begin() = 10`同时执行可能会导致数据竞争。作为一般规则的例外，对于一个`vector<bool> y`，`y[0] = true`可以与`y[1] = true`竞争。——注结束]

### 26.2.3 序列容器
- <sup>1</sup> 序列容器将一个有限集合的对象组织成严格的线性排列。库提供了四种基本的序列容器：`vector`、`forward_list`、`list`和`deque`。此外，`array`被提供为一个提供有限序列操作的序列容器，因为它有固定数量的元素。该库还提供容器适配器，使构建抽象数据类型变得容易，例如`stack`和`queue`，通过使用基本顺序容器种类（或者通过使用用户可能定义的其他顺序容器）。
- <sup>2</sup> 序列容器为程序员提供了不同的复杂性权衡，并应被相应地使用。`vector`或`array`是应被默认使用的序列容器类型。当序列中部有频繁插入和删除时，`list`或`forward_list`应被使用。当大多数插入和删除发生在序列的开头或结尾时，`deque`是选择的数据结构。
- <sup>3</sup> 在表[87](#)和[88](#)中，`X`表示一个序列容器类；`a`表示一个包含元素类型`T`的类型`X`的一个值；u表示正被声明的变量的名称；如果限定标识符`X::allocator_type`是有效的且表示一个类型，`A`表示`X::allocator_type`，如果不，`A`表示`allocator<T>`；`i`和`j`
表示满足输入迭代器要求的迭代器且指向可隐式转换为`value_type`的元素；`[i, j)`表示一个有效的区间；`il`指定一个类型`initializer_list<value_type>`的对象；`n`表示类型`X::size_type`的一个值；`p`表示`a`的一个有效常量迭代器；`q`表示`a`的一个有效可解引用常量迭代器；`[q1, q2)`表示`a`中常量迭代器的一个有效区间；`t`表示`X::value_type`的一个左值或常量右值；`rv`表示`X::value_type`的一个非常量右值。`Args`表示一个模板参数包；`args`表示一个有`Args&&`模式的函数参数包。
- <sup>4</sup> 表达式的复杂度是与序列相关的。

<p id="table87"><center>表87——序列容器要求（额外容器）</center></p>

|表达式|返回类型|断言/说明<br/>前置/后置条件|
|-|-|-|
|`X(n, t)`<br/>`X u(n, t);`||*要求：*`T`到`X`中应`CopyInsertable`。<br/>*后置条件：*`distance(begin(), end()) == n`<br/>用`t`的`n`份副本构造一个序列容器|
|`X(i, j)`<br/>`X u(i, j);`||*要求：*`T`从`*i`到`X`中应`EmplaceConstructible`。对于`vector`，<br/>如果迭代器不满足前向迭代器要求（[27.2.5](#)），`T`到`X`中也应`MoveInsertable`。<br/>在区间`[i, j)`中的每个迭代器应恰好被解引用一次。<br/>*后置条件：*`distance(begin(), end()) == distance(i, j)`<br/>构造一个与区间`[i, j)`相等的序列容器|
|`X(il)`||相当于`X(il.begin(), il.end())`|
|`a = il`|`X&`|*要求：*`T`到`X`中`CopyInsertable`且`CopyAssignable`。将区间`[il.begin(), `<br/>`il.end())`赋值给`a`。`a`的所有存在元素被赋值或销毁。<br/>*返回：*`*this`。|
|`a.emplace(p, args)`|`iterator`|*要求：*`T`从`args`到`X`中`EmplaceConstructible`。对于`vector`和`deque`，<br/>`T`到`X`中也`MoveInsertable`且` MoveAssignable`。<br/>*效果：*在`p`前插入一个用`std::forward<Args>(args)...`构造的`T`类型对象。|
|`a.insert(p, t)`|`iterator`|*要求：*`T`到`X`中应`CopyInsertable`。对于`vector`和`deque`，<br/>`T`也应`CopyAssignable`。<br/>*效果：*在`p`前插入一份`t`的副本。|
|`a.insert(p, rv)`|`iterator`|*要求：*`T`到`X`中应`MoveInsertable`。对于`vector`和`deque`，<br/>`T`也应`MoveAssignable`。<br/>*效果：*在`p`前插入一份`rv`的副本。|
|`a.insert(p, n, t)`|`iterator`|*要求：*`T`到`X`中应`CopyInsertable`且`CopyAssignable`。<br/>在`p`前插入`t`的`n`份副本|
|`a.insert(p, i, j)`|`iterator`|*要求：*`T`从`*i`到`X`中应`EmplaceConstructible`。对于`vector`和`deque`，<br/>`T`到`X`中也应`MoveConstructible`、`MoveAssignable`且可交换（[20.5.3.2](#)）。<br/>在区间`[i, j)`中的每个迭代器应恰好被解引用一次。<br/>*要求：*`i`和`j`不是`a`中的迭代器。<br/>在`p`前插入`[i, j)`中元素的副本|
|`a.insert(p, il)`|`iterator`|`a.insert(p, il.begin(), il.end())`。|
|`a.erase(q)`|`iterator`|*要求：*对于`vector`和`deque`，`T`应`MoveAssignable`。<br/>*效果：*删除`q`指向的元素。|
|`a.erase(q1, q2)`|`iterator`|*要求：*对于`vector`和`deque`，`T`应`MoveAssignable`。<br/>*效果：*删除区间`[q1, q2)`中的元素。|
|`a.clear()`|`void`|销毁`a`中的所有元素。使指向`a`的元素的所有引用、指针和迭代器失效，<br/>且可能使逾尾迭代器失效。<br/>*后置条件：*`a.empty()`返回`true`。<br/>*复杂度：*线性。|
|`a.assign(i, j)`|`void`|*要求：*`T`从`*i`到`X`中应`EmplaceConstructible`。对于`vector`，<br/>如果迭代器不满足前向迭代器要求（[27.2.5](#)），`T`到`X`中也应`MoveInsertable`。<br/>在区间`[i, j)`中的每个迭代器应恰好被解引用一次。<br/>*要求：*`i`和`j`不是`a`中的迭代器。<br/>用`[i, j)`的一份副本替换`a`中元素。使指向`a`的元素的所有引用、<br/>指针和迭代器失效。对于`vector`和`deque`，也使逾尾迭代器失效。|
|`a.assign(il)`|`void`|`a.assign(il.begin(), il.end())`。|
|`a.assign(n, t)`|`void`|*要求：*`T`到`X`中应`CopyInsertable`且`CopyAssignable`。<br/>*要求：*`T`不是`a`中的引用。<br/>用`t`的`n`份副本替换`a`中元素。对于`vector`和`deque`，<br/>也使逾尾迭代器失效。|
