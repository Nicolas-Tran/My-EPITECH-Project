/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** print_bytes
*/

#include <fcntl.h>
#include <elf.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <stdio.h>
#include "flags.h"
#include "header.h"
#include <unistd.h>

static void print_shit(uint8_t *buf, int j)
{
    for (int i = 0; i < 16; i++, j++) {
        if (buf[j] < 32 || buf[j] > 127)
            printf(".");
        else
            printf("%c", buf[j]);
    }
    printf("\n");
}

static void print_bytes(int j, uint8_t *buf)
{

    for (int i = 0; i < 16; i++, j++) {
        printf("%02x", buf[j]);
        if (i % 4 == 3)
        printf(" ");
    }
    printf(" ");
}

void test(Elf64_Shdr *shdr, uint8_t *buf, int i)
{
    int tmp = shdr[i].sh_addr;
    for (long unsigned int j = shdr[i].sh_offset; j < shdr[i].sh_offset +
        shdr[i].sh_size; j+= 16) {
            printf(" %04x ", tmp);
            tmp += 16;
            print_bytes(j, buf);
            print_shit(buf, j);
    }
}