/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** print_header
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

int check_file(void *buf)
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
    if (elf->e_ident[EI_CLASS] == ELFCLASS64)
        return 64;
    return 0;
}

int objdump(const char *file_name)
{
    int fd;
    void *buf;
    struct stat s;

    fd = open(file_name, O_RDONLY);
    if (fd == -1) {
        perror("open: ");
        return 84;
    }
    fstat(fd, &s);
    buf = mmap(NULL, s.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (buf == MAP_FAILED) {
        perror("map ");
        return 84;
    }
    if (check_file(buf) == 84) {
        printf ("%s: file format not recognized\n", file_name);
        return 84;
    }
    if (check_file(buf) == 32)
        print_all32(buf, file_name);
    if (check_file(buf) == 64)
        print_all(buf, file_name);
    close(fd);
    return 0;
}