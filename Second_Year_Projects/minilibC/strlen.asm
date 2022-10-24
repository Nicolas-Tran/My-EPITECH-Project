BITS 64
section .text
global strlen

strlen:
    xor rax, rax ;; valeur de retour 
    xor rcx, rcx ;; compteur

loop:
    cmp byte [rdi + rcx], 0 ;; compare si str est à la fin
    je end ;; si oui va à la fin
    inc rcx ;; increment compteur
    jmp loop ;; goto loop

end:
    mov rax, rcx ;; set valeur de retour au compteur
    ret ;; return