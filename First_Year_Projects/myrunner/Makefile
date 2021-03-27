##
## EPITECH PROJECT, 2020
## Phoenix_Bootcamp_Day03
## File description:
## Makefile
##

CC	=	gcc

SRC	=	main.c			\
		sources/create_object.c		\
		sources/destroy_object.c	\
		sources/create_rect.c		\
		sources/create_vec.c		\
		sources/video_mode_set.c	\
		sources/analyse_events.c	\
		sources/my_runner.c		\
		sources/create_parallax.c	\
		sources/draw_parallax.c		\
		sources/move_parallax.c		\
		sources/set_position_parallax.c	\
		sources/reset_position_parallax.c	\
		sources/create_parallax2.c		\
		sources/move_all_parallax.c		\
		sources/create_duck.c			\
		sources/move_rect.c			\
		sources/free_all.c			\
		sources/clock_function.c		\
		sources/game_loop.c			\
		sources/jump.c				\
		sources/config_clock.c	\
		sources/reset_position_parallax2.c	\
		sources/usage.c	\

CFLAGS	=	-Wall -Wextra

CPPFLAGS=	-I./includes -lcsfml-graphics -lcsfml-system -lcsfml-window -lcsfml-audio

OBJ	=	$(SRC:.c=.o)

NAME	=	my_runner

all:		$(NAME)

$(NAME):	$(OBJ)
		$(CC) -o $(NAME) $(OBJ) $(CFLAGS) $(CPPFLAGS)

clean:
		rm -f $(OBJ)

fclean:		clean
		rm -f $(NAME)

re:		fclean all
