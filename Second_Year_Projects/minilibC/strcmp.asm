BITS 64
section .text
global strcmp

strcmp:
    xor rax, rax
    xor rcx, rcx
    xor r9, r9

loop:
    cmp byte [rdi + rcx], 0
    je end
    mov al, byte [rdi + rcx]
    mov r9b, byte [rsi + rcx]
    cmp al, r9b
    jne end
    inc rcx
    jmp loop

end:
    mov al, byte [rdi + rcx]
    mov r9b, byte [rsi + rcx]
    sub rax, r9
    ret