/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** print_all32
*/
#include <fcntl.h>
#include <elf.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <stdio.h>
#include "flags.h"
#include "header.h"
#include <unistd.h>
#include "other.h"

static void print_format32(const Elf32_Ehdr *elf, const char *file_name)
{
    if (elf->e_ident[EI_CLASS] == ELFCLASS32)
        printf("\n%s:     file format elf32-i386\n", file_name);
    else
        printf("\n%s:     file format elf32-x86-32\n", file_name);
}

static void print_architecture32(const Elf32_Ehdr *elf)
{
    int binary_flag = get_flags_binary32(elf);

    if (elf->e_ident[EI_CLASS] == ELFCLASS32)
        printf("architecture: i386, flags 0x%08x:\n", binary_flag);
    else
        printf("architecture: i386:x86-32, flags 0x%08x:\n", binary_flag);
}

static void print_symbol32(const Elf32_Ehdr *elf)
{
    if (elf->e_type == ET_REL)
        printf("HAS_RELOC, HAS_SYMS\n");
    if (elf->e_type == ET_EXEC)
        printf("EXEC_P, HAS_SYMS, D_PAGED\n");
    if (elf->e_type == ET_DYN)
        printf("HAS_SYMB, DYNAMIC, D_PAGED\n");
    if (elf->e_type == ET_CORE || elf->e_type == ET_NONE)
        printf("\n");
    printf("start address 0x%08x\n\n", elf->e_entry);
}

void print_all32(void *buf, const char *file_name)
{
    Elf32_Ehdr *elf;

    elf = buf;
    print_format32(elf, file_name);
    print_architecture32(elf);
    print_symbol32(elf);
}