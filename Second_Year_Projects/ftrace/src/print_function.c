/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** print_function
*/

#include "struct.h"
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stddef.h>
#include <stdio.h>
#include <unistd.h>

int print_function(char *const *av)
{
    int fd = open(av[1], O_RDONLY);
    needed_struct_t elf_s;
    elf_version(EV_CURRENT);
    elf_s.elf = elf_begin(fd, ELF_C_READ, NULL);
    while ((elf_s.scn = elf_nextscn(elf_s.elf, elf_s.scn)) != NULL) {
        gelf_getshdr(elf_s.scn, &(elf_s.shdr));
        if (elf_s.shdr.sh_type == SHT_SYMTAB)
            break;
    }
    elf_s.data = elf_getdata(elf_s.scn, NULL);
    for (int ii = 0; ii < elf_s.shdr.sh_size / elf_s.shdr.sh_entsize; ++ii) {
        gelf_getsym(elf_s.data, ii, &(elf_s.sym));
        if (ELF64_ST_TYPE(elf_s.sym.st_info) == STT_FUNC)
            printf("Entering function %s at %p\n",
            elf_strptr(elf_s.elf, elf_s.shdr.sh_link, elf_s.sym.st_name),
            (void *)(elf_s.sym.st_value));
    }
    elf_end(elf_s.elf);
    close(fd);
    return 0;
}