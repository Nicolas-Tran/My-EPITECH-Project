/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** first_while.c
*/

#include "my_hunter.h"

void do_when_clock(duck_t ducka, sfVector2f vec, sfClock *clock, float seconds)
{
    if (seconds > 1.0) {
        move_rect(&ducka.rect, 110, 220);
        sfSprite_move(ducka.sprite, vec);
        sfClock_restart(clock);
    }
}
