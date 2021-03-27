/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** create_duck.c
*/

#include "my_runner.h"

struct game_object *create_duck(void)
{
    sfVector2f vec = create_vec(0, 750);
    sfIntRect rect = create_rect(0, 0, 110, 110);
    struct game_object *duck = creat_obj("duck.png", vec, rect);

    duck->clock = sfClock_create();
    duck->status = 0;
    sfSprite_setPosition(duck->sprite, vec);
    return duck;
}
