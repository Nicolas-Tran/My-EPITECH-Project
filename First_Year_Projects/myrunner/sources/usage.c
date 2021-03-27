/*
** EPITECH PROJECT, 2021
** my_runner
** File description:
** usage.c
*/

#include <unistd.h>

void print_usage(void)
{
    write(1, "Runner game created with CSFML\n", 33);
    write(1, "\nUsage\n ./my_runner\n", 20);
    write(1, "Options\n -h    print the usage and quit.\n", 42);
    write(1, "\nUser Interactions\n SPACE_KEY     jump.\n", 41);
}
