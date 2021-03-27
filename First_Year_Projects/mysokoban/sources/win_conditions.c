/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** win_conditions.c
*/

#include <stddef.h>
#include <stdlib.h>
#include "sokoban.h"

static int count_box(char **map_copy)
{
    int count = 0;

    for (int i = 0; map_copy[i] != NULL; i++) {
        for (int j = 0; map_copy[i][j] != '\0'; j++) {
            if (map_copy[i][j] == 'O')
                count++;
        }
    }
    return count;
}

static position_t *malloc_pos(int size)
{
    position_t *pos = malloc(sizeof(position_t) * (size + 1));

    return pos;
}

static int check_box_position(char **map, position_t *pos, int size)
{
    int i = 0;

    for (; map[pos[i].y][pos[i].x] == 'X'; i++) {
    }
    for (int j = 0; j < size; j++)
        if (map[pos[j].y][pos[j].x] == ' ')
            map[pos[j].y][pos[j].x] = 'O';
    if (i == size) {
        return 0;
    }
    return 1;
}

int win_conditions(char **map, char **map_copy)
{
    int size = count_box(map_copy);
    position_t *pos = malloc_pos(size);
    int count = 0;

    for (int i = 0; map_copy[i] != NULL; i++)
        for (int j = 0; map_copy[i][j] != '\0'; j++)
            if (map_copy[i][j] == 'O') {
                pos[count].x = j;
                pos[count].y = i;
                count++;
            }
    if (check_box_position(map, pos, size) == 0) {
        free(pos);
        return 0;
    }
    free(pos);
    return 1;
}
