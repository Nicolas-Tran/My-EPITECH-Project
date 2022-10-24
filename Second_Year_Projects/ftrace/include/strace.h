/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** strace
*/

#ifndef STRACE_H_
#define STRACE_H_

void print_arg(const struct user_regs_struct regs);
int print_function(char *const *av);
int strace(const char *_binary_name, char *const *av, char *const *const env);

#endif /* !STRACE_H_ */
