/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** clock_function.c
*/

#include "my_runner.h"

void clock_function(struct game_object *duck, float seconds, sfClock *clock,
                    sfRenderWindow *window)
{
    if (seconds > 1) {
        sfRenderWindow_drawSprite(window, duck->sprite, NULL);
        move_rect(&duck->recta, 110, 220);;
        sfClock_restart(clock);
    }
    sfRenderWindow_drawSprite(window, duck->sprite, NULL);
}
