/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** move_player.c
*/

#include <curses.h>
#include <stdlib.h>
#include "sokoban.h"

position_t *get_position(char **map);

static void move_left(position_t *pos, char **map)
{
    if (map[pos->y][pos->x - 1] !=  '#') {
        if (map[pos->y][pos->x - 1] == 'X' && map[pos->y][pos->x - 2] != '#'
            && map[pos->y][pos->x - 2] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y][pos->x - 1] = 'P';
            map[pos->y][pos->x - 2] = 'X';
        }
        if (map[pos->y][pos->x - 1] != '#' && map[pos->y][pos->x - 1] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y][pos->x - 1] = 'P';
        }
    }
}

static void move_right(position_t *pos, char **map)
{
    if (map[pos->y][pos->x + 1] !=  '#') {
        if (map[pos->y][pos->x + 1] == 'X' && map[pos->y][pos->x + 2] != '#'
            && map[pos->y][pos->x + 2] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y][pos->x + 1] = 'P';
            map[pos->y][pos->x + 2] = 'X';
        }
        if (map[pos->y][pos->x + 1] != '#' && map[pos->y][pos->x + 1] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y][pos->x + 1] = 'P';
        }
    }
}

static void move_up(position_t *pos, char **map)
{
    if (map[pos->y - 1][pos->x] !=  '#') {
        if (map[pos->y - 1][pos->x] == 'X' && map[pos->y - 2][pos->x] != '#'
            && map[pos->y - 2][pos->x] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y - 1][pos->x] = 'P';
            map[pos->y - 2][pos->x] = 'X';
        }
        if (map[pos->y - 1][pos->x] != '#' && map[pos->y - 1][pos->x] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y - 1][pos->x] = 'P';
        }
    }
}

static void move_down(position_t *pos, char **map)
{
    if (map[pos->y + 1][pos->x] !=  '#') {
        if (map[pos->y + 1][pos->x] == 'X' && map[pos->y + 2][pos->x] != '#'
            && map[pos->y + 2][pos->x] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y + 1][pos->x] = 'P';
            map[pos->y + 2][pos->x] = 'X';
        }
        if (map[pos->y + 1][pos->x] != '#' && map[pos->y + 1][pos->x] != 'X') {
            map[pos->y][pos->x] = ' ';
            map[pos->y + 1][pos->x] = 'P';
        }
    }
}

int move_player(int key, char **map)
{
    position_t *pos = get_position(map);

    if (pos != NULL) {
        if (key == KEY_LEFT)
            move_left(pos, map);
        if (key == KEY_RIGHT) {
            move_right(pos, map);
        }
        if (key == KEY_UP) {
            move_up(pos, map);
        }
        if (key == KEY_DOWN) {
            move_down(pos, map);
        }
        free(pos);
    }
    return 0;
}
