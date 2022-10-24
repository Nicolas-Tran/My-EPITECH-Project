/*
** EPITECH PROJECT, 2022
** B-PSU-400-PAR-4-1-nmobjdump-nicolas1.tran
** File description:
** find_symbols
*/

#include <elf.h>

char find_symbols(Elf64_Sym *sym, Elf64_Shdr *shdr)
{
    char symbol;

    switch (sym->st_shndx) {
    case SHN_UNDEF:
        symbol = 'U';
        break;
    case SHN_ABS:
        symbol = 'A';
        break;
    case SHN_COMMON:
        symbol = 'C';
        if (ELF64_ST_BIND(sym->st_info) == STB_LOCAL)
            symbol = 'c';
        break;
    default:
        break;
    }
    switch (ELF64_ST_BIND(sym->st_info)) {
    case STB_GNU_UNIQUE:
        symbol = 'u';
        break;
    case STB_WEAK:
        symbol = 'W';
        if (ELF64_ST_TYPE(sym->st_info) == STT_OBJECT)
            symbol = 'V';
        if (sym->st_shndx == SHN_UNDEF)
            symbol += 'a' - 'A';
        break;
    default:
        break;
    }
    if (shdr[sym->st_shndx].sh_type == SHT_PROGBITS && shdr[sym->st_shndx].sh_flags == (SHF_ALLOC | SHF_EXECINSTR))
        return 'T' + ((ELF64_ST_BIND(sym->st_info) == STB_LOCAL)) * 32;
    if ((shdr[sym->st_shndx].sh_type == SHT_PROGBITS && shdr[sym->st_shndx].sh_flags == (SHF_ALLOC | SHF_WRITE)) || shdr[sym->st_shndx].sh_type == SHT_DYNAMIC)
        return 'D' + ((ELF64_ST_BIND(sym->st_info) == STB_LOCAL)) * 32;
    if (shdr[sym->st_shndx].sh_type == SHT_PROGBITS && shdr[sym->st_shndx].sh_flags == SHF_ALLOC)
        return 'R' + ((ELF64_ST_BIND(sym->st_info) == STB_LOCAL)) * 32;
    if (shdr[sym->st_shndx].sh_type == SHT_NOBITS && shdr[sym->st_shndx].sh_flags == (SHF_ALLOC | SHF_WRITE))
        return 'B' + ((ELF64_ST_BIND(sym->st_info) == STB_LOCAL)) * 32;
    return symbol;
}