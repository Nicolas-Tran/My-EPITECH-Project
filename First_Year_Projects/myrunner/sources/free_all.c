/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** free_all.c
*/

#include "my_runner.h"

void free_all(struct game_object *Px, struct game_object *Px2)
{
    free(Px);
    free(Px2);
}
