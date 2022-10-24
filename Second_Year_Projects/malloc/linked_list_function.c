/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** linked_list_function
*/

#include "linked_list.h"
#include <stdio.h>
#include <stdlib.h>

linked_list_t *create_my_list(void)
{
    linked_list_t *new_list = sbrk(sizeof(linked_list_t));

    if (new_list == (void *)-1)
        return NULL;
    new_list->breakpoint = sbrk(0);
    if (new_list->breakpoint == (void *)-1)
        return NULL;
    new_list->next = NULL;
    new_list->size = 0;
    new_list->free = false;
    return new_list;
}

void push(linked_list_t *head)
{
    for (; head->next != NULL; head = head->next);
    head->next = sbrk(sizeof(linked_list_t));
    head->next->size = 0;
    head->next->free = false;
    head->next->next = NULL;
    head->next->breakpoint = sbrk(0);
}

linked_list_t *find_block(linked_list_t *head, size_t size)
{
    linked_list_t *tmp = space;

    while (tmp && !(tmp->free && tmp->size >= size)) {
        head = tmp;
        tmp = tmp->next;
    }
    return tmp;
}

size_t align_byte(size_t size)
{
    size_t byte = 2;

    for (; byte < size; byte = byte * 2);
    return byte;
}

void add_in_position(linked_list_t *position, size_t size)
{
    linked_list_t *new = sbrk(sizeof(linked_list_t));
    linked_list_t *tmp = space;

    for (; tmp != NULL; tmp = tmp->next)
    if (tmp == position) {
        new->size = size;
        new->free = false;
        new->next = tmp;
        position->next = new;
    }
}