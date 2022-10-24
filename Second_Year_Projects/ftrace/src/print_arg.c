/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** print_arg
*/

#include "struct.h"
#include "syscall.h"
#include <stdio.h>
#include <sys/user.h>

void print_arg(const struct user_regs_struct regs)
{
    printf("Syscall %s (", table[regs.orig_rax].name);
    if (table[regs.orig_rax].first_param != 0)
        printf("0x%llx", regs.rdi);
    if (table[regs.orig_rax].second_param != 0)
        printf(", 0x%llx", regs.rsi);
    if (table[regs.orig_rax].third_param != 0)
        printf(", 0x%llx", regs.rdx);
    if (table[regs.orig_rax].fourth_param != 0)
        printf(", 0x%llx", regs.rcx);
    if (table[regs.orig_rax].fifth_param != 0)
        printf(", 0x%llx", regs.r8);
    if (table[regs.orig_rax].sixth_param != 0)
        printf(", 0x%llx", regs.r9);
    printf(") = 0x%llx\n", regs.rax);
}