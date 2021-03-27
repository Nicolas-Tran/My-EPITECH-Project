/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** set_position_parallax.c
*/

#include "my_runner.h"

void set_parallax_position(struct game_object *obj)
{
    sfVector2f vec = create_vec(0, 0);
    sfVector2f vec1 = create_vec(0, 820);
    sfVector2f vec2 = create_vec(0, 275);
    sfVector2f vec3 = create_vec(0, 350);
    sfVector2f vec4 = create_vec(0, 690);

    sfSprite_setPosition(obj->sprite, vec);
    sfSprite_setPosition(obj->next->sprite, vec2);
    sfSprite_setPosition(obj->next->next->sprite, vec2);
    sfSprite_setPosition(obj->next->next->next->sprite, vec3);
    sfSprite_setPosition(obj->next->next->next->next->sprite, vec4);
    sfSprite_setPosition(obj->next->next->next->next->next->sprite, vec1);
}
