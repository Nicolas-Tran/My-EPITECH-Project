/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** alloc_function
*/

#include <unistd.h>
#include "linked_list.h"
#include <stdio.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void *malloc(size_t size)
{
    linked_list_t *tmp = NULL;

    if (space == NULL) {
        tmp = create_my_list();
        if (tmp == NULL)
            return NULL;
        space = tmp;
        sbrk(getpagesize() * 2);
        sbrk(0);
    } else {
        size = align_byte(size);
        tmp = space;
        if (find_block(tmp, size) == NULL)
            push(tmp);
        for (; tmp->next != NULL; tmp = tmp->next);
    }
    return tmp->breakpoint;
}

void free(void *ptr)
{
    linked_list_t *tmp = ptr;

    tmp->breakpoint = NULL;
    tmp->free = true;
    tmp = NULL;
}

void *calloc(size_t nmemb, size_t size)
{
    linked_list_t *tmp = space;

    tmp = malloc(nmemb * size);
    memset(tmp, 0, 8);
    return tmp;
}

void *realloc(void *ptr, size_t size)
{
    if (size == 0 && ptr != NULL) {
        free(ptr);
        return ptr;
    }
    if (size == 0)
        return NULL;
    if (ptr == NULL)
        return malloc(size);
    else {
        add_in_position(ptr, size);
        return ptr;
    }
    return NULL;
}

void *reallocarray(void *ptr, size_t nmemb, size_t size)
{
    if (ptr == NULL)
        return calloc(nmemb, size);
    return realloc(ptr, nmemb * size);
}