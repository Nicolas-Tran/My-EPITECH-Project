/*
** EPITECH PROJECT, 2020
** push-swap
** File description:
** sort_algo.c
*/

#include "pushswap.h"

void sort_algo(node_t **l_a, node_t **l_b)
{
    int smallest = 0;
    node_t *list = *l_a;

    if (check_order(*l_a) == 1) {
        for (; *l_b != NULL; push_arg2_to_arg1(l_a, l_b)) {
            if ((*l_b)->next == NULL)
                write(1, "pa", 2);
            else
                write(1, "pa ", 3);
        }
        return;
    }
    for (smallest = list->data; list != NULL; list = list->next) {
        if (smallest > list->data)
            smallest = list->data;
    }
    for (; (*l_a)->data != smallest; first_become_last(l_a))
        write(1, "ra ", 3);
    push_arg2_to_arg1(l_b, l_a);
    write(1, "pb ", 3);
    free_node(list);
}
