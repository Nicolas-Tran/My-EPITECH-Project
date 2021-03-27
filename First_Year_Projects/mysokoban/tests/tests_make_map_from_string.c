/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** tests_make_map_from_buffer.c
*/

#include <criterion/criterion.h>
#include "sokoban.h"
#include <stddef.h>
#include <curses.h>

char **make_map_from_string(char *map_pathname);

static void free_map(char **map)
{
    for (int i = 0; map[i] != NULL; i++)
        free(map[i]);
    free(map);
}

Test(make_map_from_string, map_output)
{
    char **mapp = make_map_from_string("map");

    cr_assert_not_null(mapp);
    free_map(mapp);
}
