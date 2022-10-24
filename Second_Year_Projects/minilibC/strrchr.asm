BITS 64
section .text
global strrchr

strrchr:
    xor rax, rax
    xor rcx, rcx

loop:
    cmp byte [rdi], 0
    je null
    cmp byte [rdi], sil
    je end
    inc rdi
    jmp loop

null:
    cmp sil, 0
    je isnull
    mov rax, rcx
    ret

isnull:
    mov rax, rdi
    ret

end:
    mov rcx, rdi
    inc rdi
    jmp loop