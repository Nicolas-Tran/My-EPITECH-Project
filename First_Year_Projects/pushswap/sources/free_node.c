/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** free_node.c
*/

#include "pushswap.h"

void free_node(node_t *head)
{
    node_t *tmp;

    for (node_t *list = head; list != NULL;) {
        tmp = list;
        list = list->next;
        free(tmp);
    }
}
