export type Product = {
  id: number
  image: string
  altImage: string
  name: string
  theme: string
  price: number
}

export const products: Product[] = [
  {
    id: 1,
    image: "/assets/h1.png",
    altImage: "/assets/m1.png",
    name: "Drake",
    theme: "Honestly, Nevermind",
    price: 799,
  },
  {
    id: 2,
    image: "/assets/h2.png",
    altImage: "/assets/m2.png",
    name: "Kanye West",
    theme: "Donda",
    price: 849,
  },
  {
    id: 3,
    image: "/assets/h3.png",
    altImage: "/assets/m3.png",
    name: "Travis Scott",
    theme: "UTOPIA",
    price: 899,
  },
  {
    id: 4,
    image: "/assets/h4.png",
    altImage: "/assets/m4.png",
    name: "Kendrick Lamar",
    theme: "DAMN.",
    price: 749,
  },
  {
    id: 5,
    image: "/assets/h5.png",
    altImage: "/assets/m5.png",
    name: "J. Cole",
    theme: "The Off-Season",
    price: 749,
  },
  {
    id: 6,
    image: "/assets/h6.png",
    altImage: "/assets/m6.png",
    name: "Juice WRLD",
    theme: "Goodbye & Good Riddance",
    price: 799,
  },
  {
    id: 7,
    image: "/assets/h7.png",
    altImage: "/assets/m7.png",
    name: "Lil Uzi Vert",
    theme: "Pink Tape",
    price: 849,
  },
  {
    id: 8,
    image: "/assets/h8.png",
    altImage: "/assets/m8.png",
    name: "Nicki Minaj",
    theme: "Queen",
    price: 749,
  },
  {
    id: 9,
    image: "/assets/h9.png",
    altImage: "/assets/m9.png",
    name: "Eminem",
    theme: "Slim Shady",
    price: 799,
  },
  {
    id: 10,
    image: "/assets/h10.png",
    altImage: "/assets/m10.png",
    name: "Pop Smoke",
    theme: "Tribute",
    price: 849,
  },
  {
    id: 11,
    image: "/assets/h11.png",
    altImage: "/assets/m11.png",
    name: "21 Savage",
    theme: "Savage Mode",
    price: 699,
  },
  {
    id: 12,
    image: "/assets/h12.png",
    altImage: "/assets/m12.png",
    name: "MF DOOM",
    theme: "Mask Up",
    price: 849,
  },
  {
    id: 13,
    image: "/assets/h13.png",
    altImage: "/assets/m13.png",
    name: "Snoop Dogg",
    theme: "OG Era",
    price: 699,
  },
  {
    id: 14,
    image: "/assets/h14.png",
    altImage: "/assets/m14.png",
    name: "Ice Spice",
    theme: "Gen Z Princess",
    price: 749,
  },
  {
    id: 15,
    image: "/assets/h15.png",
    altImage: "/assets/m15.png",
    name: "ASAP Rocky",
    theme: "Testing Vibes",
    price: 849,
  },
  {
    id: 16,
    image: "/assets/h16.png",
    altImage: "/assets/m16.png",
    name: "Post Malone",
    theme: "Rockstar Theme",
    price: 749,
  },
  {
    id: 17,
    image: "/assets/h17.png",
    altImage: "/assets/m17.png",
    name: "Jay-Z",
    theme: "Blueprint Legacy",
    price: 899,
  },
  {
    id: 18,
    image: "/assets/h18.png",
    altImage: "/assets/m18.png",
    name: "Lil Wayne",
    theme: "Tha Carter",
    price: 799,
  },
  {
    id: 19,
    image: "/assets/h19.png",
    altImage: "/assets/m19.png",
    name: "Doja Cat",
    theme: "Scarlet Energy",
    price: 699,
  },
  {
    id: 20,
    image: "/assets/h20.png",
    altImage: "/assets/m20.png",
    name: "Tyla",
    theme: "Water (Street R&B Fusion)",
    price: 749,
  },
]

export const phoneModels = {
  apple: [
    "iPhone 12",
    "iPhone 12 Pro",
    "iPhone 13",
    "iPhone 13 Pro",
    "iPhone 13 Pro Max",
    "iPhone 14",
    "iPhone 14 Pro Max",
    "iPhone 15",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max",
  ],
  android: [
    "Samsung Galaxy S21",
    "Galaxy S22 Ultra",
    "Galaxy S23",
    "Galaxy Z Flip",
    "OnePlus 11R",
    "Nothing Phone (2)",
    "Xiaomi 14",
    "Vivo X100",
    "Pixel 7",
    "Pixel 8 Pro",
  ],
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByPage(page: number, perPage = 8): Product[] {
  const startIndex = (page - 1) * perPage
  return products.slice(startIndex, startIndex + perPage)
}

export function getPageCount(perPage = 8): number {
  return Math.ceil(products.length / perPage)
}
