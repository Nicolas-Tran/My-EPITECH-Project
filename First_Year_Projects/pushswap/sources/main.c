/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** main.c
*/

#include "pushswap.h"

int main(int ac, char **av)
{
    node_t *l_a = NULL;
    node_t *l_b = NULL;

    if (ac == 1 || ac == 2) {
        write(1, "\n", 1);
        return 0;
    }
    for (int i = ac - 1; i > 0; i--)
        init_node(my_getnbr(av[i]), &l_a);
    if (check_order(l_a) == 1) {
        write(1, "\n", 1);
        return 0;
    }
    while (check_order(l_a) != 1 || l_b != NULL)
        sort_algo(&l_a, &l_b);
    free_node(l_a);
    write(1, "\n", 1);
    return 0;
}
