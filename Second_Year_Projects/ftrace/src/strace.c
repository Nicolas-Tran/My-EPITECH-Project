/*
** EPITECH PROJECT, 2022
** Delivery_tek_2
** File description:
** strace
*/

#include "struct.h"
#include <sys/reg.h>
#include <sys/ptrace.h>
#include <stddef.h>
#include <sys/user.h>
#include "strace.h"
#include <sys/types.h>
#include <unistd.h>

void is_printable(long ret, struct user_regs_struct regs)
{
    if (ret > 0 && regs.orig_rax < 328)
        print_arg(regs);
}

int strace(const char *_binary_name, char *const *av, char *const *const env)
{
    int child = fork();
    struct rusage usage;
    struct user_regs_struct regs;
    trace_rets_t rets;
    long ret = 0;

    if (child == 0) {
        ptrace(PTRACE_TRACEME, 0, NULL, NULL);
        execve(_binary_name, av, env);
    } else {
        for (long i = 0; i != -1;) {
            wait4(child, &(rets.status), rets.option, &usage);
            ptrace(PTRACE_GETREGS, child, NULL, &regs);
            ret = ptrace(PTRACE_PEEKTEXT, child, regs.rip, NULL);
            is_printable(ret, regs);
            i = ptrace(PTRACE_SINGLESTEP, child, NULL, NULL);
        }
    }
    return 0;
}