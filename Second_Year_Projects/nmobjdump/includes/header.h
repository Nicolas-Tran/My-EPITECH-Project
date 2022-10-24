/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** header
*/

#ifndef HEADER_H_
    #define HEADER_H_

    #include <elf.h>

int objdump(const char *file_name);
int get_flags_binary(const Elf64_Ehdr *elf);
void print_all(void *buf, const char *file_name);
void test(Elf64_Shdr *shdr, uint8_t *buf, int i);

#endif /* !HEADER_H_ */
