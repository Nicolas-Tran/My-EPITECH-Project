/*
** EPITECH PROJECT, 2022
** indie
** File description:
** test
*/

#include <vector>
#include <string>
#include <iostream>

class A {
    public:
        A(const std::string &r):test(r) {}

    std::string test;
};

class B : public A {
    public:
        B(const std::string &e):A(e) {test2 = "test2b";}

    std::string test2;

};

int main()
{
    std::vector<A> a1;
    std::vector<B> b1;
    std::vector<std::reference_wrapper<A>> refA;

    a1.emplace_back("a1");
    b1.emplace_back("b1");

    refA.push_back(a1[0]);
    refA.push_back(b1[0]);

    b1[0].test = "testy";
    for (auto &i : refA) {
        std::cout << i.get().test << std::endl;
    }
    std::cout << b1[0].test2 << std::endl;
}