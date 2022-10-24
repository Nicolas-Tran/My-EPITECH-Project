/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** nm
*/

#ifndef NM_H_
#define NM_H_

#include <elf.h>

int nm_function(const char *file_name);
char find_symbols(Elf64_Sym *sym, Elf64_Shdr *shdr);

#endif /* !NM_H_ */
