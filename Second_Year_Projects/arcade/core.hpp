/*
** EPITECH PROJECT, 2022
** B-OOP-400-PAR-4-1-arcade-florian.autour
** File description:
** core
*/

#ifndef CORE_HPP_
#define CORE_HPP_

#include <memory>
#include <dlfcn.h>
#include <vector>
#include "lib/Graphicals/IGraphical.hpp"
#include "lib/Games/IGame.hpp"

extern std::vector<const char *> GRAPHICAL_LIBRARIES;

void next_library(void);

template <typename I>
std::unique_ptr<I> getInterface(const char *lib_path, const char *class_getter, void *handle)
{
    std::string error_msg;
    void *func;

    handle = dlopen(lib_path, RTLD_NOW);
    if(handle == NULL)
        throw std::invalid_argument("dlopen error: " + std::string(dlerror()));
    func = dlsym(handle, class_getter);
    if (func == NULL)
    {
        error_msg = std::string(dlerror());
        dlclose(handle);
        throw std::invalid_argument("dlsym error: " + error_msg);
    }
    typedef std::unique_ptr<I> executer(void);
    executer *f = (executer*)func;
    std::unique_ptr<I> interface = f();
    return (interface);
}

namespace core {
    void core(std::unique_ptr<IGame> &game, std::unique_ptr<IGraphical> &graphical);
}

#endif /* !CORE_HPP_ */
