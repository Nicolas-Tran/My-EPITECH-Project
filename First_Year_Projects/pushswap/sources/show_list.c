/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** show_list.c
*/

#include "pushswap.h"

void show_list(node_t *head)
{
    for (node_t *list = head; list != NULL; list = list->next) {
        my_put_nbr(list->data);
        write(1, " ", 1);
    }
    write(1, "\n", 1);
}
