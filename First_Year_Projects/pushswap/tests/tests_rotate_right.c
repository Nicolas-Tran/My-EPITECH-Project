/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** tests_rotate_right.c
*/

#include <criterion/criterion.h>
#include "pushswap.h"

Test(rotate_right, rotate)
{
    node_t *head = NULL;

    init_node(0, &head);
    init_node(1, &head);
    init_node(2, &head);
    rotate_right(&head);
    cr_expect_eq(head->next->next->data, 1);
    cr_expect_eq(head->data, 0);
    free_node(head);
}
