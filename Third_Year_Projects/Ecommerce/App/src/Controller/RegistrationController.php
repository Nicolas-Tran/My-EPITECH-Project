<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;

/**
 * @Route("/api", name="api_")
 */

class RegistrationController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function index(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {

        $em = $doctrine->getManager();
        $decoded = json_decode($request->getContent());
        $email = $decoded->email;
        $login = $decoded->login;
        $plaintextPassword = $decoded->password;
        $firstname = $decoded->firstname;
        $lastname = $decoded->lastname;


        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $user->setEmail($email);
        $user->setLogin($login);
        $user->setFirstname($firstname);
        $user->setLastname($lastname);
        $em->persist($user);
        $em->flush();

        return $this->json(['message' => 'Registered Successfully']);
    }

    /**
     * @Route("/users", name="get_users", methods={"GET"})
     */

    public function getUsers(): JsonResponse
    {

        $usersData[] = [
            'id' => $this->getUser()->getId(),
            'email' => $this->getUser()->getEmail(),
            'login' => $this->getUser()->getLogin(),
            'firstname' => $this->getUser()->getFirstname(),
            'lastname' => $this->getUser()->getLastname(),
        ];

        return new JsonResponse($usersData);
    }

    /**
     * @Route("/users", name="users_users", methods={"PATCH"})
     */

    public function editUsers(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher):JsonResponse
    {
        $user= $this->getUser();

        $decoded = json_decode($request->getContent());
        $email = $decoded->email;
        $login = $decoded->login;
        $plaintextPassword = $request->request->get('password');
        $firstname = $decoded->firstname;
        $lastname = $decoded->lastname;
        if($plaintextPassword != null) {
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );
        }   
        
        if($email){
            $user->setEmail($email);
        }
        if($login){
            $user->setLogin($login);
        }
        if($hashedPassword){
            $user->setPassword($hashedPassword);
        }
        if($firstname){
            $user->setFirstname($firstname);
        }
        if($lastname){
            $user->setLastname($lastname);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $this->json(['message' => 'updated Successfully']);
    }

}