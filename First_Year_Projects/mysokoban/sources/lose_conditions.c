/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** lose_conditions.c
*/

#include <stddef.h>
#include <stdlib.h>
#include "sokoban.h"

static int count_box(char **map)
{
    int count = 0;

    for (int i = 0; map[i] != NULL; i++) {
        for (int j = 0; map[i][j] != '\0'; j++) {
            if (map[i][j] == 'X')
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

static int all_conditions(char **map, position_t *pos, int j)
{
    if (map[pos[j].y][pos[j].x + 1] == '#' && (map[pos[j].y + 1][pos[j].x]
        == 'X' || map[pos[j].y - 1][pos[j].x] == 'X') && (map[pos[j].y - 1]
        [pos[j].x + 1] == '#' || map[pos[j].y + 1][pos[j].x + 1] == '#'))
        return 0;
    if (map[pos[j].y][pos[j].x - 1] == '#' && (map[pos[j].y + 1][pos[j].x]
        == 'X' || map[pos[j].y - 1][pos[j].x] == 'X') && (map[pos[j].y - 1]
        [pos[j].x - 1] == '#' || map[pos[j].y + 1][pos[j].x - 1] == '#'))
        return 0;
    if (map[pos[j].y + 1][pos[j].x] == '#' && (map[pos[j].y][pos[j].x + 1]
        == 'X' || map[pos[j].y][pos[j].x - 1] == 'X') && (map[pos[j].y + 1]
        [pos[j].x + 1] == '#' || map[pos[j].y + 1][pos[j].x - 1] == '#'))
        return 0;
    if (map[pos[j].y - 1][pos[j].x] == '#' && (map[pos[j].y][pos[j].x + 1]
        == 'X' || map[pos[j].y][pos[j].x - 1] == 'X') && (map[pos[j].y - 1]
        [pos[j].x + 1] == '#' || map[pos[j].y - 1][pos[j].x - 1] == '#'))
        return 0;
    return 1;
}

static int check_box_position(char **map, position_t *pos, int size)
{
    int i = 0;

    for (int j = 0; j < size; j++) {
        if (map[pos[j].y][pos[j].x - 1] == '#' && (map[pos[j].y + 1][pos[j].x]
            == '#' || map[pos[j].y - 1][pos[j].x] == '#'))
            i++;
        if (map[pos[j].y][pos[j].x + 1] == '#' && (map[pos[j].y + 1][pos[j].x]
            == '#' || map[pos[j].y - 1][pos[j].x] == '#'))
            i++;
        if (all_conditions(map, pos, j) == 0)
            i++;
        if (i == size)
            return 0;
    }
    return 1;
}

int lose_conditions(char **map)
{
    int size = count_box(map);
    position_t *pos = malloc_pos(size);
    int count = 0;

    for (int i = 0; map[i] != NULL; i++)
        for (int j = 0; map[i][j] != '\0'; j++)
            if (map[i][j] == 'X') {
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
