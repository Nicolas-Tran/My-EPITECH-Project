/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** linked_list
*/

#ifndef LINKED_LIST_H_
#define LINKED_LIST_H_

#include <unistd.h>
#include <stdbool.h>

static void *space = NULL;

typedef struct linked_list_s {
    void *breakpoint;
    struct linked_list_s *next;
    bool free;
    size_t size;
} linked_list_t;

linked_list_t *create_my_list(void);
void push(linked_list_t *head);
linked_list_t *find_block(linked_list_t *head, size_t size);
size_t align_byte(size_t size);
void add_in_position(linked_list_t *position, size_t size);

#endif /* !LINKED_LIST_H_ */
