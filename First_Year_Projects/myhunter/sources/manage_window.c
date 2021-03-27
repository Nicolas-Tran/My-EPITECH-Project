/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** manage_window.c
*/

#include "my_hunter.h"

void manage_window(sfRenderWindow *window, duck_t ducka)
{
    sfSprite_setTextureRect(ducka.sprite, ducka.rect);
    sfRenderWindow_clear(window, sfBlack);
    sfRenderWindow_drawSprite(window, ducka.sprite, NULL);
}
