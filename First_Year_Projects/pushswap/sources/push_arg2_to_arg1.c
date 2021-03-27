/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** push_arg2_to_arg1.c
*/

#include "pushswap.h"

void push_arg2_to_arg1(node_t **l_a, node_t **l_b)
{
    node_t *head_b = *l_b;

    if (*l_b == NULL)
        return;
    *l_b = (*l_b)->next;
    head_b->next = *l_a;
    *l_a = head_b;
}
