/*
** EPITECH PROJECT, 2021
** my_hunter
** File description:
** game_loop.c
*/

#include "my_hunter.h"

void game_loop(sfRenderWindow *window, sfTime time, duck_t *ducka,
            sfClock *clock)
{
    float seconds = 0;

    sfRenderWindow_display(window);
    time = sfClock_getElapsedTime(clock);
    seconds = time.microseconds / 1000000.0;
    printf("%f\n", seconds);
    if (seconds > 1.0) {
        do_clock(*ducka, clock);
        move_rect(&ducka->rect, 110, 220);
    }
    manage_window(window, *ducka);
}
