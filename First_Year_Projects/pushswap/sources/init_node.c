/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** init_node.c
*/

#include "pushswap.h"

void init_node(int data, node_t **head)
{
    node_t *node = malloc(sizeof(node_t));

    node->data = data;
    node->next = *head;
    *head = node;
}
