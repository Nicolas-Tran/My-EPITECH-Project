/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** struct
*/

#ifndef STRUCT_H_
#define STRUCT_H_

#include <sys/resource.h>
#include <sys/wait.h>
#include <libelf.h>
#include <elf.h>
#include <gelf.h>

typedef struct syscall_s {
    int ret;
    char *name;
    int jsp;
    int ret_t;
    int first_param;
    int second_param;
    int third_param;
    int fourth_param;
    int fifth_param;
    int sixth_param;
} syscall_t;

typedef struct needed_struct_s {
    Elf *elf;
    Elf_Scn *scn;
    GElf_Shdr shdr;
    Elf_Data *data;
    GElf_Sym sym;
} needed_struct_t;

typedef struct trace_rets_s {
    int status;
    int option;
    long ret;
} trace_rets_t;
#endif /* !STRUCT_H_ */
