BITS 64
section .text
global memset

memset:
    xor rax, rax
    xor rcx, rcx

loop:
    cmp rdx, rcx
    je end
    mov byte [rdi + rcx], sil
    inc rcx
    jmp loop

end:
    mov rax, rdi
    ret