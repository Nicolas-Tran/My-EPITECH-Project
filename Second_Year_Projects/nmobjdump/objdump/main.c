/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** main
*/

#include <string.h>
#include <stdlib.h>
#include <sys/stat.h>
#include "header.h"

int main(int ac, char **av)
{
    if (ac == 1)
        return objdump("a.out");
    for (int i = 1; i < ac; i++)
        if (objdump(av[i]) == 84)
            return 84;
    return 0;
}