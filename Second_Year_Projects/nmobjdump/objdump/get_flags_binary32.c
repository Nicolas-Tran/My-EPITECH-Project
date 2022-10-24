/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** get_flags_binary
*/

#include <elf.h>
#include "flags.h"
#include <stddef.h>
#include <stdlib.h>
#include <dlfcn.h>

int get_flags_binary32(const Elf32_Ehdr *elf)
{
    int result = HAS_SYMS;

    if (elf->e_type == ET_REL) {
        result += HAS_RELOC;
        return result;
    }
    if (elf->e_type == ET_EXEC) {
        result += EXEC_P + D_PAGED;
        return result;
    }
    if (elf->e_type == ET_DYN) {
        result += DYNAMIC + D_PAGED;
        return result;
    }
    return 0;
}