/*
** EPITECH PROJECT, 2020
** my_runner
** File description:
** destroy_object.c
*/

#include "my_runner.h"

void free_all(struct game_object *Px, struct game_object *Px2);

static void destroy_object(struct game_object *obj)
{
    sfSprite_destroy(obj->sprite);
    sfTexture_destroy(obj->texture);
}

void destroy_all_object(struct game_object *Pllax, struct game_object *Pllax2,
                        sfMusic *music, sfRenderWindow *window)
{
    sfRenderWindow_destroy(window);
    sfMusic_destroy(music);
    destroy_object(Pllax);
    destroy_object(Pllax2);
    free_all(Pllax, Pllax2);
}
