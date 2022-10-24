##
## EPITECH PROJECT, 2021
## Makefile
## File description:
## compile
##

CC	=	gcc

SRC	=	nm/main.c	\
		nm/nm_function.c	\
		nm/find_symbols.c

SRC2	=	objdump/main.c	\
			objdump/print_header.c	\
			objdump/get_flags_binary.c	\
			objdump/print_all.c	\
			objdump/print_bytes.c	\
			objdump/get_flags_binary32.c	\
			objdump/print_all32.c	\


OBJ	=	$(SRC:.c=.o)

OBJ2	=	$(SRC2:.c=.o)

NAME	=	my_nm

NAME2	=	my_objdump

CFLAGS	=	-Wall -Wextra

CPPFLAGS	=	-I./includes

all:	$(NAME)

$(NAME):	nm	objdump

nm: $(OBJ)
	$(CC) -o $(NAME) $(OBJ)

objdump:	$(OBJ2)
	$(CC) -o $(NAME2) $(OBJ2) -ldl

DEBUG:	CFLAGS += -g3
DEBUG:	$(NAME)

clean:
	rm -f $(OBJ)
	rm -f $(OBJ2)

fclean:	clean
	rm -f $(NAME)
	rm -f $(NAME2)

re:	fclean all

.PHONY : all $(NAME) clean DEBUG fclean re