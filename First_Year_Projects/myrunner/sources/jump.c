/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** jump.c
*/

#include "my_runner.h"

void jump(struct game_object *duck)
{
    sfVector2f sprite_pos = sfSprite_getPosition(duck->sprite);
    sfVector2f jump_limit = create_vec(0, 650);
    float tmp = 750;

    if (sprite_pos.y > jump_limit.y && duck->status == 1)
        sfSprite_move(duck->sprite, (sfVector2f) {0, -10});
    if (sprite_pos.y < tmp && duck->status == 2)
        sfSprite_move(duck->sprite, (sfVector2f) {0, 10});
    if (sprite_pos.y <= jump_limit.y)
        duck->status = 2;
    if (sprite_pos.y >= tmp && duck->status == 2)
        duck->status = 0;
}
