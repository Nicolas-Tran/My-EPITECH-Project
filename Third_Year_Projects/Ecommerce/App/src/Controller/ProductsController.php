<?php
 
namespace App\Controller;
 
use App\Entity\Products;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
 
/**
 * @Route("/api", name="api_")
 */
 
class ProductsController extends AbstractController
{
    /**
    * @Route("/products", name="products_index", methods={"GET"})
    */
    public function index(ManagerRegistry $doctrine): Response
    {
        $products = $doctrine
            ->getRepository(Products::class)
            ->findAll();
  
        $data = [];
  
        foreach ($products as $product) {
           $data[] = [
               'id' => $product->getId(),
               'name' => $product->getName(),
               'description' => $product->getDescription(),
               'photo' => $product->getPhoto(),
               'price' => $product->getPrice(),
           ];
        }
  
  
        return $this->json($data);
    }
 
  
    /**
     * @Route("/products", name="products_new", methods={"POST"})
     */
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
  
        $products = new Products();
        $products->setName($request->request->get('name'));
        $products->setDescription($request->request->get('description'));
        $products->setPhoto($request->request->get('photo'));
        $products->setPrice($request->request->get('price'));
  
        $entityManager->persist($products);
        $entityManager->flush();
  
        return $this->json('Created new products successfully with id ' . $products->getId());
    }
  
    /**
     * @Route("/products/{id}", name="products_show", methods={"GET"})
     */
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $products = $doctrine->getRepository(Products::class)->find($id);
  
        if (!$products) {
  
            return $this->json('No products found for id' . $id, 404);
        }
  
        $data =  [
            'id' => $products->getId(),
            'name' => $products->getName(),
            'description' => $products->getDescription(),
            'photo' => $products->getPhoto(),
            'price' => $products->getPrice(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/products/{id}", name="products_edit", methods={"PUT"})
     */
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $products = $entityManager->getRepository(Products::class)->find($id);
  
        if (!$products) {
            return $this->json('No products found for id' . $id, 404);
        }
  
        $products->setName($request->request->get('name'));
        $products->setDescription($request->request->get('description'));
        $products->setPhoto($request->request->get('photo'));
        $products->setPrice($request->request->get('price'));
        $entityManager->flush();
  
        $data =  [
            'id' => $products->getId(),
            'name' => $products->getName(),
            'description' => $products->getDescription(),
            'photo' => $products->getPhoto(),
            'price' => $products->getPrice(),
        ];
          
        return $this->json($data);
    }

    /**
     * @Route("/products/{id}", name="products_edit", methods={"PATCH"})
     */
    public function singleEdit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $products = $entityManager->getRepository(Products::class)->find($id);
  
        if (!$products) {
            return $this->json('No products found for id' . $id, 404);
        }
        
        if($request->request->get('name')) {
            $products->setName($request->request->get('name'));
        }
        if($request->request->get('description')) {
            $products->setDescription($request->request->get('description'));
        }
        if($request->request->get('photo')) {
            $products->setPhoto($request->request->get('photo'));
        }
        if($request->request->get('price')) {
            $products->setPrice($request->request->get('price'));
        }
        $entityManager->flush();
  
        $data =  [
            'id' => $products->getId(),
            'name' => $products->getName(),
            'description' => $products->getDescription(),
            'photo' => $products->getPhoto(),
            'price' => $products->getPrice(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/products/{id}", name="products_delete", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $products = $entityManager->getRepository(Products::class)->find($id);
  
        if (!$products) {
            return $this->json('No products found for id' . $id, 404);
        }
  
        $entityManager->remove($products);
        $entityManager->flush();
  
        return $this->json('Deleted a products successfully with id ' . $id);
    }
}