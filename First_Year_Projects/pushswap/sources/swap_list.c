/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** swap_list.c
*/

#include "pushswap.h"

void swap_list(node_t **head)
{
    node_t *tmp = *head;
    node_t *tmp2 = (*head)->next;

    if (*head == NULL)
        return;
    tmp->next = tmp2->next;
    tmp2->next = tmp;
    *head = tmp2;
}
