/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** destroy_sprite.c
*/

#include "my_hunter.h"

int destroy_all(duck_t ducka, sfRenderWindow *window, sfClock *clock)
{
    sfSprite_destroy(ducka.sprite);
    sfRenderWindow_destroy(window);
    sfClock_destroy(clock);
    return 0;
}
