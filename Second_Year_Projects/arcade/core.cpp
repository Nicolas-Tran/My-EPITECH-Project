/*
** EPITECH PROJECT, 2022
** B-OOP-400-PAR-4-1-arcade-florian.autour
** File description:
** core
*/

#include <memory>
#include <iostream>
#include <chrono>
#include "core.hpp"

using namespace std::chrono;

namespace core {
    static bool cooldown_libswitch(_V2::system_clock::time_point start)
    {
        auto stop = high_resolution_clock::now();
        auto duration = duration_cast<microseconds>(stop - start).count(); 

        return (duration >= 500000);
    }

    void core(std::unique_ptr<IGame> &game, std::unique_ptr<IGraphical> &graphical)
    {
        gpc::Input input = gpc::ARROW_KEY_NEUTRAL;
        void *handle = nullptr;
        _V2::system_clock::time_point cooldown_start = high_resolution_clock::now();

        while (game->status() != GAME_EXIT) {
            input = graphical->getInput();
            if (input == gpc::EVENT_CLOSED || game->status() == GAME_LOST)
                break;
            game->play(input);
            graphical->displayGame(game->getMap());
            graphical->displayScore(game->getScore());
            if ((input == gpc::NEXT_GRAPHICAL || input == gpc::PREVIOUS_GRAPHICAL) && cooldown_libswitch(cooldown_start)) {
                graphical = getInterface<IGraphical>(GRAPHICAL_LIBRARIES.front(), "getClass", handle);
                next_library();
                cooldown_start = high_resolution_clock::now();
            }
        }
    }
}