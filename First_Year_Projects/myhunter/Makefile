##
## EPITECH PROJECT, 2020
## my_hunter
## File description:
## Makefile
##

SRC	=	sources/main.c	\
		sources/analyse_events.c	\
		sources/move_rect.c		\
		sources/duck.c			\
		sources/rect_size.c		\
		sources/create_vec.c		\
		sources/video_mode_set.c	\
		sources/h.c			\
		sources/first_while.c		\
		sources/destroy_sprite.c	\
		sources/hit.c			\
		sources/clock_function.c	\
		sources/manage_window.c		\
		sources/my_hunter.c		\
		sources/game_loop.c		\

CC	=	gcc

OBJ	=	$(SRC:.c=.o)

CPPFLAGS=	-Wall -Wextra -l csfml-audio -l csfml-graphics -l csfml-system -l csfml-window

NAME	=	my_hunter

all:		$(NAME)

$(NAME):	$(OBJ)
		$(CC) -o $(NAME) $(OBJ) $(CPPFLAGS)

clean:
		rm -f $(OBJ)

fclean:		clean
		rm -f $(NAME)

re:		fclean all

.PHONY:		all clean fclean
