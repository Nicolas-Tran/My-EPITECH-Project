/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** get_position.c
*/

#include "sokoban.h"
#include <stddef.h>
#include <stdlib.h>

position_t *get_position(char **map)
{
    int j = 0;
    int i = 0;
    position_t *pos = malloc(sizeof(position_t));

    for (; map[i] != NULL; i++) {
        for (; map[i][j] != 'P' && map[i][j] != '\0' && map[i][j] != '\n'; j++);
        if (map[i][j] == 'P') {
            pos->x = j;
            pos->y = i;
            return pos;
        }
        j = 0;
    }
    return NULL;
}
