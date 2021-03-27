/*
** EPITECH PROJECT, 2021
** my_sokoban
** File description:
** main.c
*/

#include <unistd.h>

int my_strcmp(char const *s1, char const *s2);
int mysokoban_function(char *map_pathname);

static void print_help(void)
{
    write(1, "USAGE\n     ./my_sokoban map\nDESCRIPTION\n     map file "
        "representing the warehouse map, containing '#' for walls,\n          "
        " 'P' for the player, 'X' for boxes and '0' for storage locations.\n"
        , 188);
}

int main(int ac, char **av)
{   
    if (ac != 2)
        return 84;
    if (my_strcmp(av[1], "-h") == 0) {
        print_help();
        return 0;
    }
    return mysokoban_function(av[1]);
}
