<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/orders")
 */
class OrderController extends AbstractController
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/", name="get_orders", methods={"GET"})
     */

    public function getOrders(OrderRepository $orderRepository): JsonResponse
    {
        $user = $this->getUser();

        $orders = $this->entityManager->getRepository(Order::class)->findBy(['user' => $user]);

        $orderData = [];

        foreach ($orders as $order) {

            $orderData[] = [
                'id' => $order->getId(),
                'totalPrice' => $order->getTotalPrice(),
                'creationDate' => $order->getCreationDate(),
                'products' => $order->getProducts(),
            ];
        }

        return new JsonResponse($orderData);
    }

    /**
     * @Route("/{id}", name="get_order", methods={"GET"})
     */
    public function getOrder(OrderRepository $orderRepository, $id): JsonResponse
    {
        $user = $this->getUser();
        $order = $this->entityManager->getRepository(Order::class)->findOneBy(['user' => $user, 'id' => $id]);
        if (!$order) {
            return new JsonResponse(['error' => 'Order not found']);
        }

        $orderData = [
            'id' => $order->getId(),
            'totalPrice' => $order->getTotalPrice(),
            'creationDate' => $order->getCreationDate(),
            'products' => $order->getProducts(),
        ];

        return new JsonResponse($orderData);
    }

}