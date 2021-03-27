/*
** EPITECH PROJECT, 2020
** my_hunter
** File description:
** main.c
*/

#include <stddef.h>

void my_hunter(void);
void show_instructions(char **av);

int main(int ac, char **av, char **env)
{
    if (ac > 2)
        return 84;
    if (env == NULL)
        return 84;
    if (ac == 2) {
        show_instructions(av);
        return 0;
    }
    my_hunter();
    return 0;
}
