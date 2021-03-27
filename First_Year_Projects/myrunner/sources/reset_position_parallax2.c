/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** reset_parallax2.c
*/

#include "my_runner.h"

void reset_position_parallax2(struct game_object *parallax)
{
    sfVector2f vec = create_vec(1913, 0);
    sfVector2f vec1 = create_vec(1915, 820);
    sfVector2f vec2 = create_vec(1915, 275);
    sfVector2f vec3 = create_vec(1915, 350);
    sfVector2f vec4 = create_vec(1915, 275);

    if (sfSprite_getPosition(parallax->sprite).x < -1900)
        sfSprite_setPosition(parallax->sprite, vec);
    if (sfSprite_getPosition(parallax->next->sprite).x < -1900)
        sfSprite_setPosition(parallax->next->sprite, vec2);
    if (sfSprite_getPosition(parallax->next->next->sprite).x < -1900)
        sfSprite_setPosition(parallax->next->next->sprite, vec2);
    if (sfSprite_getPosition(parallax->next->next->next->sprite).x < -1900)
        sfSprite_setPosition(parallax->next->next->next->sprite, vec3);
    if (sfSprite_getPosition(parallax->next->next->next->next->sprite).x
        < -1900)
        sfSprite_setPosition(parallax->next->next->next->next->sprite, vec4);
    if (sfSprite_getPosition(parallax->next->next->next->next->next->sprite).x
        < -1900)
        sfSprite_setPosition(parallax->next->next->next->next->next->sprite,
                            vec1);
}
