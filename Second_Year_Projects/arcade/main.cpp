/*
** EPITECH PROJECT, 2022
** NANOTEKSPICE
** File description:
** main
*/

#include <iostream>
#include <string>
#include "string.h"
#include "lib/Graphicals/IGraphical.hpp"
#include "lib/Games/IGame.hpp"
#include "core.hpp"

std::vector<const char*> GRAPHICAL_LIBRARIES = {"lib/arcade_ncurses.so", "lib/arcade_sfml.so"};

static int gest_error(int ac, const char *av[])
{
    if (ac != 2) {
        throw std::invalid_argument("error: wrong number of arguments");
        return 84;
    }
    if (av[1] == std::string("-h") || av[1] == std::string("--help")) {
        return 0;
    }
    return 0;
}

void next_library(void)
{
    if (GRAPHICAL_LIBRARIES.size() == 3)
        std::iter_swap(GRAPHICAL_LIBRARIES.begin(), GRAPHICAL_LIBRARIES.end());
    std::iter_swap(GRAPHICAL_LIBRARIES.begin(), GRAPHICAL_LIBRARIES.begin() + 1);
}


int main(int ac, const char *av[])
{
    if (gest_error(ac, av) == 84)
        return 84;
    if (std::string(av[1]) == GRAPHICAL_LIBRARIES.front())
        next_library();
    try
    {
        void *handle_game = nullptr;
        void *handle_graphical = nullptr;

        std::unique_ptr<IGame> game = getInterface<IGame>("lib/arcade_pacman.so", "getGame", handle_game);
        std::unique_ptr<IGraphical> graphical = getInterface<IGraphical>(av[1], "getClass", handle_graphical);
        game->setHandle(handle_game);
        graphical->setHandle(handle_graphical);
        core::core(game, graphical);
    }    
    catch(const std::exception& e)
    {
        std::cerr << e.what() << std::endl;
        return 84;
    }
    return 0;
}
