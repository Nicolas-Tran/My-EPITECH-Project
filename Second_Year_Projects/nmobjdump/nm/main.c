/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** main
*/

#include "nm.h"
#include <stdio.h>

int main(int ac, char **av)
{
    if (ac == 1) {
        nm_function("a.out");
        return 0;
    }
    for (int i = 1; i < ac; i++) {
        printf("%s: \n", av[i]);
        nm_function(av[i]);
    }
    return 0;
}
