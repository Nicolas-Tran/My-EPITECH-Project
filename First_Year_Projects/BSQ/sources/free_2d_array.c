/*
** EPITECH PROJECT, 2020
** BSQ
** File description:
** free_2d_array.c
*/

#include <stdlib.h>

void free_2d_array(char **map, int nb_raws)
{
    for (int i = 0; i < nb_raws; i++)
        free(map[i]);
    free(map);
}
