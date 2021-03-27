/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** rotate.c
*/

#include "pushswap.h"

void first_become_last(node_t **head)
{
    node_t *last = *head;

    if (*head == NULL)
        return;
    for (; last->next != NULL; last = last->next);
    last->next = *head;
    *head = (*head)->next;
    last->next->next = NULL;
}
