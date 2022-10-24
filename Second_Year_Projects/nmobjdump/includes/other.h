/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** other
*/

#ifndef OTHER_H_
#define OTHER_H_

    #include <elf.h>

int get_flags_binary32(const Elf32_Ehdr *elf);
void print_all32(void *buf, const char *file_name);
void test32(Elf64_Shdr *shdr, uint8_t *buf, int i);
int objdump32(const char *file_name);

#endif /* !OTHER_H_ */
