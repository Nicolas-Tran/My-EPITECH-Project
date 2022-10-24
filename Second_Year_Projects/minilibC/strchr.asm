BITS 64
section .text
global strchr

strchr:
    xor rax, rax
    xor rcx, rcx

loop:
    cmp byte [rdi], 0
    je isnull
    cmp byte [rdi], sil
    je end
    inc rdi
    jmp loop

isnull:
    cmp sil, 0
    je end
    mov rax, 0
    ret

end:
    mov rax, rdi
    ret