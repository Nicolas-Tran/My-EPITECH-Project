/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** duck.c
*/

#include "my_hunter.h"

sfSprite *duck(void)
{
    sfIntRect rect;
    sfSprite *sprite;
    sfTexture *texture;

    rect.top = 0;
    rect.left = 0;
    rect.width = 110;
    rect.height = 110;
    texture = sfTexture_createFromFile("duck.png", NULL);
    sprite = sfSprite_create();
    sfSprite_setTexture(sprite, texture, sfTrue);
    sfSprite_setTextureRect(sprite, rect);
    return (sprite);
}
