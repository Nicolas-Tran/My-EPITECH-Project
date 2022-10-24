BITS 64
section .text
global memmove

memmove:
    xor rax, rax
    xor rcx, rcx
    xor r9, r9
    
loop:
    cmp rdx, rcx
    je end
    mov r9b, byte [rsi + rcx]
    mov byte [rdi + rcx], r9b
    inc rcx
    jmp loop

end:
    mov rax, rdi
    ret