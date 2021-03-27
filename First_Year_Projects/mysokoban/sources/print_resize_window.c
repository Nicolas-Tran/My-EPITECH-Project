/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** print_resize_window.c
*/

#include <stddef.h>
#include <curses.h>

static void change_value(int *value, int i)
{
    if (*value < i)
        *value = i;
}

static int count_biggest_cols(char **map)
{
    int count = 0;

    for (int j = 0; map[j] != NULL; j++)
        for (int i = 0; map[j][i] != '\0'; i++)
            change_value(&count, i);
    return count;
}

static int count_raws(char **map)
{
    int j = 0;

    for (; map[j] != NULL; j++);
    return j;
}

int print_resize_window(char **map, WINDOW *window)
{
    getmaxyx(window, LINES, COLS);
    if (LINES < count_raws(map) || COLS < count_biggest_cols(map)) {
        mvprintw(LINES / 2, COLS / 2 - 11, "Resize the window please");
        return 1;
    }
    return 0;
}
