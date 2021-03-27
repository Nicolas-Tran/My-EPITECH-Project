/*
** EPITECH PROJECT, 2021
** mysokoban
** File description:
** tests_get_position.c
*/

#include <criterion/criterion.h>
#include "sokoban.h"

position_t *get_position(char **map);
char **make_map_from_string(char *map_pathname);

static void free_map(char **map)
{
    for (int i = 0; map[i] != NULL; i++)
        free(map[i]);
    free(map);
}

Test(get_position, check_position)
{
    char **mapp = make_map_from_string("map");
    position_t *pos = get_position(mapp);

    cr_assert_not_null(pos);
    cr_assert_eq(pos->x, 4);
    cr_assert_eq(pos->y, 2);
    free_map(mapp);
    free(pos);
}
