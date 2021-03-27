/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** h.c
*/

#include "my_hunter.h"

void show_instructions(char **av)
{
    if (av[1][0] == '-' && av[1][1] == 'h' && av[1][2] == '\0') {
        write(1, "Move your mouse to move the cursor\n", 35);
        write(1, "Press left click to shoot\n", 26);
        write(1, "Your goal is to shoot as many birds as possible\n", 48);
    }
}
