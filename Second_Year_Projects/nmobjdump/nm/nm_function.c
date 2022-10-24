/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** nm_function
*/

#include <fcntl.h>
#include <elf.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>
#include "nm.h"

static int check_file(void *buf)
{
    Elf64_Ehdr *elf;

    elf = buf;
    if (elf->e_ident[EI_MAG0] != ELFMAG0)
        return 84;
    if (elf->e_ident[EI_MAG1] != ELFMAG1)
        return 84;
    if (elf->e_ident[EI_MAG2] != ELFMAG2)
        return 84;
    if (elf->e_ident[EI_MAG3] != ELFMAG3)
        return 84;
    if (elf->e_ident[EI_CLASS] == ELFCLASS32)
        return 32;
    return 0;
}

int nm_function(const char *file_name)
{
    int fd;
    void *buf;
    struct stat s;
    Elf64_Ehdr *elf = NULL;
    Elf64_Shdr *sections = NULL;
    Elf64_Sym *sym = NULL;
    char *header = NULL;
    char *str = NULL;
    int size = 0;
    char symbols = ' ';

    fd = open(file_name, O_RDONLY);
    if (fd == -1)
    {
        fprintf(stderr, "%s: No such file or directory\n",file_name);
        return 84;
    }
    fstat(fd, &s);
    buf = mmap(NULL, s.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (buf == MAP_FAILED) {
        perror("buf");
        return 84;
    }
    if (check_file(buf) == 84 || check_file(buf) == 32) {
        printf("%s: file format not recognized\n", file_name);
        return 84;
    }
    elf = buf;
    sections = (void *) buf + elf->e_shoff;
        if (sections == NULL)
            perror("SECTION IS NULL");
    header = buf + sections[elf->e_shstrndx].sh_offset;
    for (int i = 0; i < elf->e_shnum; i++) {
        if (strcmp(&header[sections[i].sh_name], ".strtab") == 0)
            str = buf + sections[i].sh_offset;
        if (strcmp(&header[sections[i].sh_name], ".symtab") == 0)
        {
            sym = buf + sections[i].sh_offset;
            size = sections[i].sh_size / sections[i].sh_entsize;
        }
    }
    for (int i = 0; i < size; i++) {
        if (ELF64_ST_TYPE((&sym[i])->st_info) != STT_FILE && sym[i].st_name != 0) {
        symbols = find_symbols(&sym[i], sections);
        if (symbols == 'U' || symbols == 'W' || symbols == 'w')
            printf("                 ");
        else
            printf("%016lx ", sym[i].st_value);
        printf("%c %s\n", symbols, &str[sym[i].st_name]);
        }
    }
    return 0;
}