/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** print_all
*/
#include <fcntl.h>
#include <elf.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <stdio.h>
#include "flags.h"
#include "header.h"
#include <unistd.h>

static void print_format(const Elf64_Ehdr *elf, const char *file_name)
{
    if (elf->e_ident[EI_CLASS] == ELFCLASS32)
        printf("\n%s:     file format elf64-x86-32\n", file_name);
    else
        printf("\n%s:     file format elf64-x86-64\n", file_name);
}

static void print_architecture(const Elf64_Ehdr *elf)
{
    int binary_flag = get_flags_binary(elf);

    if (elf->e_ident[EI_CLASS] == ELFCLASS32)
        printf("architecture: i386:x86-32, flags 0x%08x:\n", binary_flag);
    else
        printf("architecture: i386:x86-64, flags 0x%08x:\n", binary_flag);
}

static void print_symbol(const Elf64_Ehdr *elf)
{
    if (elf->e_type == ET_REL)
        printf("HAS_RELOC, HAS_SYMS\n");
    if (elf->e_type == ET_EXEC)
        printf("EXEC_P, HAS_SYMS, D_PAGED\n");
    if (elf->e_type == ET_DYN)
        printf("HAS_SYMB, DYNAMIC, D_PAGED\n");
    if (elf->e_type == ET_CORE || elf->e_type == ET_NONE)
        printf("\n");
    printf("start address 0x%016lx\n\n", elf->e_entry);
}

void print_all(void *buf, const char *file_name)
{
    Elf64_Ehdr *elf;
    Elf64_Shdr *shdr;
    char *tab;

    elf = buf;
    shdr = (buf + elf->e_shoff);
    tab = (buf + shdr[elf->e_shstrndx].sh_offset);
    print_format(elf, file_name);
    print_architecture(elf);
    print_symbol(elf);
    for (int i = 1; i <= elf->e_shnum; i++) {
        printf("Contents of section %s:\n", &tab[shdr[i].sh_name]);
        test(shdr, buf, i);
    }
}