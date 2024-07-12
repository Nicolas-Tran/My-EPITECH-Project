<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\Order;
use App\Entity\Products;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    #[Route('/api/carts/validate', name: 'validate_cart', methods: ['POST'])]
    public function validateCart(ManagerRegistry $doctrine): JsonResponse
    {
        $user= $this->getUser();
        $cartItems = $doctrine->getRepository(Cart::class)->findBy(['user' => $user]);
    
        // Check if the cart is empty
        if (empty($cartItems)) {
            return new JsonResponse(['error' => 'Cart is empty'], Response::HTTP_BAD_REQUEST);
        }
    
        // Calculate the total price of the cart
        $order = new Order();
        $totalPrice = 0;
        $products = [];
        foreach ($cartItems as $cartItem) {
            $product = $doctrine->getRepository(Products::class)->find($cartItem->getProductId());
            $productData = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'description' => $product->getDescription(),
                'photo' => $product->getPhoto(),
            ];
            $products[] = $productData;
            $totalPrice += $cartItem->getTotal();
        }
    
        // Create a new order entity
        $order->setUser($user);
        $order->setTotalPrice($totalPrice);
        $order->setCreationDate(new \DateTime());
        $order->addProduct($products);
    
        // Save the order to the database
        $this->entityManager->persist($order);
        $this->entityManager->flush();
    
        // Remove the cart items
        foreach ($cartItems as $cartItem) {
            $this->entityManager->remove($cartItem);
        }
        $this->entityManager->flush();
    
        return new JsonResponse(['message' => 'Cart validated and converted to order']);
    }
    



    #[Route('/api/carts/{productId}', name: 'add_product_to_cart', methods: ['POST'])]
    public function addProductToCart(Request $request, $productId): JsonResponse
    {
        $user = $this->getUser();
        // retrieve the quantity of the product to add to the cart from the request
        $quantity = $request->request->get('quantity');

        // fetch the cart item from the database
        $cartItem = $this->entityManager->getRepository(Cart::class)->findOneBy(['productId' => $productId]);

        if (!$cartItem) {
            // create a new cart item if it doesn't exist in the cart yet
            $cartItem = new Cart();
            $cartItem->setProductId($productId);
            $cartItem->setQuantity($quantity);
        } else {
            // increment the quantity of the existing cart item
            $cartItem->setQuantity($cartItem->getQuantity() + $quantity);
        }

        // Fetch product name and price from the database and set them on the cart item
        $product = $this->entityManager->getRepository(Products::class)->find($productId);
        if (!$product) {
            throw $this->createNotFoundException('Product with id ' . $productId . ' not found');
        }
        $cartItem->setProductName($product->getName());
        $cartItem->setPrice($product->getPrice());
        $cartItem->setUser($user);

        // persist the changes to the cart item and flush to the database
        $this->entityManager->persist($cartItem);
        $this->entityManager->flush();

        return new JsonResponse('Product added to cart.');
    }

    #[Route('/api/carts/{productId}', name: 'remove_product_from_cart', methods: ['DELETE'])]
    public function removeProductFromCart($productId): JsonResponse
    {
        // fetch the cart item from the database
        $cartItem = $this->entityManager->getRepository(Cart::class)->findOneBy(['productId' => $productId]);

        if (!$cartItem) {
            throw $this->createNotFoundException('Product with id ' . $productId . ' not found in cart');
        }

        // remove the cart item from the cart
        $this->entityManager->remove($cartItem);
        $this->entityManager->flush();

        return new JsonResponse('Product removed from cart.');
    }

    #[Route('/api/carts', name: 'shopping_cart', methods: ['GET'])]
    public function showShoppingCart(): JsonResponse
    {
        // fetch all cart items from the database
        $cartItems = $this->entityManager->getRepository(Cart::class)->findBy(['user' => $this->getUser()]);
        
        if ($cartItems === null) {
            return new JsonResponse('Cart is empty');
        }
        // build an array of cart item data
        $cartData = [];
        foreach ($cartItems as $cartItem) {
            $cartData[] = [
                'id' => $cartItem->getId(),
                'productId' => $cartItem->getProductId(),
                'productName' => $cartItem->getProductName(),
                'quantity' => $cartItem->getQuantity(),
                'price' => $cartItem->getPrice(),
                'total' => $cartItem->getTotal(),
            ];
        }
        
        // return a JSON response
        return new JsonResponse($cartData);
    }

    
}
