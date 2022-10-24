/*
** EPITECH PROJECT, 2022
** B-YEP-400-PAR-4-1-indiestudio-julien.lor
** File description:
** MyMain
*/

#include "Const.hpp"
#include "Window.hpp"
#include "Resources.hpp"
#include "Core.hpp"
#include "AudioDevice.hpp"

int main(int ac, char **av)
{
    ray::Window window(SCREEN_WIDTH, SCREEN_HEIGHT, "Bomberman");
    ray::AudioDevice audio;
    indie::Resources resource;
    indie::core core(resource, window);

    core.draw();

    return 0;
}
