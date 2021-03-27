/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** mysokoban_function.c
*/

#include <curses.h>
#include <stdlib.h>
#include "sokoban.h"

char **make_map_from_string(char *map_pathname);
int move_player(int key, char **map);
int print_resize_window(char **map, WINDOW *window);
int win_conditions(char **map, char **map_copy);
int lose_conditions(char **map);

static void free_map(char **map)
{
    for (int i = 0; map[i] != NULL; i++)
        free(map[i]);
    free(map);
}

static int game_loop(char **map, WINDOW *window, int *key, char *map_pathname)
{
    clear();
    if (*key == ' ') {
        free_map(map);
        map = make_map_from_string(map_pathname);
    }
    if (print_resize_window(map, window) == 0)
        for (int i = 0; map[i] != NULL; i++) {
            mvprintw(LINES / 2 + i, COLS / 2, map[i]);
        }
    *key = getch();
    move_player(*key, map);
    for (int i = 0; map[i] != NULL; i++) {
        mvprintw(LINES / 2 + i, COLS / 2, map[i]);
    }
    refresh();
    return 0;
}

static void free_all(char **map, char **map_copy, WINDOW *win)
{
    free_map(map_copy);
    free_map(map);
    delwin(win);
    endwin();
}

int mysokoban_function(char *map_pathname)
{
    int key = 0;
    char **map = make_map_from_string(map_pathname);
    WINDOW *win = initscr();
    char **map_copy = make_map_from_string(map_pathname);

    if (map == NULL)
        return 84;
    cbreak();
    noecho();
    keypad(stdscr, TRUE);
    while (key != 'q' && win_conditions(map, map_copy) != 0) {
        if (lose_conditions(map) == 0) {
            free_all(map, map_copy, win);
            return 1;
        }
        game_loop(map, win, &key, map_pathname);
    }
    free_all(map, map_copy, win);
    if (key == 'q')
        return 1;
    return 0;
}
