/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** main.c
*/

#include "my_runner.h"

void print_usage(void);

int main(int ac, char **av)
{
    if (ac > 2)
        return 84;
    if (ac == 2) {
        if (av[1][0] == '-' && av[1][1] == 'h' && av[1][2] == '\0') {
            print_usage();
            return 0;
        }
        return 84;
    }
    my_runner();
    return 0;
}
