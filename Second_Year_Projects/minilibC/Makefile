##
## EPITECH PROJECT, 2021
## Makefile
## File description:
## compile
##

CC	=	nasm

SRC	=	strlen.asm	\
		strchr.asm	\
		strrchr.asm \
		memset.asm	\
		memcpy.asm	\
		strcmp.asm	\
		strncmp.asm	\
		memmove.asm	\


OBJ	=	$(SRC:.asm=.o)

NAME	=	libasm.so

%.o: %.asm
	nasm -f elf64 $<

all:	$(NAME)

$(NAME):	$(OBJ)
	ld -shared -fPIC $(OBJ) -o $(NAME)

DEBUG:	CFLAGS += -g3
DEBUG:	$(NAME)

clean:
	rm -f $(OBJ)

fclean:	clean
	rm -f $(NAME)

re:	fclean all

.PHONY : all $(NAME) clean DEBUG fclean re