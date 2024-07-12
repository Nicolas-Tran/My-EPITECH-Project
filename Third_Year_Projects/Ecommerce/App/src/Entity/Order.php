<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrderRepository;


#[ORM\Table(name: '`order`')]
#[ORM\Entity(repositoryClass: OrderRepository::class)]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['order:read'])]
    private $id;

    #[ORM\Column(type: 'float')]
    #[Groups(['order:read'])]
    private $totalPrice;

    
    #[ORM\Column(type: 'datetime')]
    #[Groups(['order:read'])]
    private $creationDate;



    // #[ORM\JoinColumn(nullable: false)]
    // #[Groups(['order:read'])]
    // #[ORM\JoinTable(name: 'order_products')]
    // #[ORM\Column(type: 'array')]
    // private $products;

    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['order:read'])]
    #[ORM\JoinTable(name: 'order_products')]
    #[ORM\Column(type: 'array')]
    private $products = [];

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['order:read'])]
    private $user;

    public function __construct()
    {
        $this->products = [];
    }
    // Getters and setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTotalPrice(): ?float
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(float $totalPrice): self
    {
        $this->totalPrice = $totalPrice;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): self
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getProducts(): array
    {
        return $this->products;
    }

    public function addProduct(array $product): self
    {
        $this->products[] = $product;

        return $this;
    }

    public function __toString(): string
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

}