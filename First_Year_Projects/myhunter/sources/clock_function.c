/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** clock_function.c
*/

#include "my_hunter.h"

void do_clock(duck_t ducka,  sfClock *clock)
{
    sfVector2f vec = create_vec(50, 0);

    sfSprite_move(ducka.sprite, vec);
    sfClock_restart(clock);
}
