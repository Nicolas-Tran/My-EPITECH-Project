/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** check_order.c
*/

#include "pushswap.h"

int check_order(node_t *head)
{
    for (node_t *list = head; list->next != NULL; list = list->next) {
        if (list->data > list->next->data)
            return 0;
    }
    return 1;
}
