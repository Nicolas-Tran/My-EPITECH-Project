BITS 64
section .text
global strncmp

strncmp:
    xor rax, rax
    xor rcx, rcx
    xor r9, r9

loop:
    
    cmp rdx, rcx
    je end
    cmp byte [rdi + rcx], 0
    je other
    mov al, byte [rdi + rcx]
    mov r9b, byte [rsi + rcx]
    cmp al, r9b
    jne end
    inc rcx
    jmp loop

other:
    mov al, byte [rdi + rcx]
    mov r9b, byte [rsi + rcx]
    sub rax, r9
    ret

end:
    sub rax, r9
    ret