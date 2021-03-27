/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** rotate_right.c
*/

#include "pushswap.h"

void rotate_right(node_t **head)
{
    node_t *before_last = *head;
    node_t *last = NULL;

    if (*head == NULL)
        return;
    for (; before_last->next->next != NULL; before_last = before_last->next);
    last = before_last->next;
    last->next = *head;
    *head = last;
    before_last->next = NULL;
}
