/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** move_parallax.c
*/

#include "my_runner.h"

void move_parallax(struct game_object *parallax)
{
    sfVector2f vec = create_vec(-0.3, 0);
    sfVector2f vec1 = create_vec(-0.6, 0);
    sfVector2f vec2 = create_vec(-1.2, 0);
    sfVector2f vec3 = create_vec(-2.5, 0);
    sfVector2f vec4 = create_vec(-5, 0);
    sfVector2f vec5 = create_vec(-10, 0);

    sfSprite_move(parallax->sprite, vec);
    sfSprite_move(parallax->next->sprite, vec1);
    sfSprite_move(parallax->next->next->sprite, vec2);
    sfSprite_move(parallax->next->next->next->sprite, vec3);
    sfSprite_move(parallax->next->next->next->next->sprite, vec4);
    sfSprite_move(parallax->next->next->next->next->next->sprite, vec5);
    reset_position_parallax(parallax);
}
