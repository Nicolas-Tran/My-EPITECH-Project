/*
** EPITECH PROJECT, 2020
** push_swap
** File description:
** tests_rotate_right.c
*/

#include <criterion/criterion.h>
#include "pushswap.h"

Test(swap_list, swap)
{
    node_t *head = NULL;

    init_node(0, &head);
    init_node(1, &head);
    init_node(2, &head);
    swap_list(&head);
    cr_expect_eq(head->next->data, 2);
    cr_expect_eq(head->data, 1);
    free_node(head);
}
