/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** game_loop.c
*/

#include "my_runner.h"

void game_loop(sfRenderWindow *window, struct game_object *parallax,
                struct game_object *parallax2, struct game_object *duck)
{
    sfRenderWindow_display(window);
    sfRenderWindow_clear(window, sfBlack);
    draw_parallax(parallax, parallax2, window);
    if (sfTime_asSeconds(sfClock_getElapsedTime(duck->clock)) > 0.2) {
        move_rect(&duck->recta, 110, 330);
        sfClock_restart(duck->clock);
    }
    if (duck->status != 0)
        jump(duck);
    sfSprite_setTextureRect(duck->sprite, duck->recta);
    sfRenderWindow_drawSprite(window, duck->sprite, NULL);
    move_all_parallax(parallax, parallax2);
}
