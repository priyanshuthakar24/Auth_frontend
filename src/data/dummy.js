import { Heart, LayoutDashboard, ShoppingBag, UserRound } from "lucide-react";
//! general menu 
export const Menus = [
    {
        name: 'Shop',
        link: 'shop'
    },

    {
        name: 'Stories',
        link: 'stories'
    }, {
        name: 'About',
        link: 'about'
    },
]

//! profile menu option if authenticated 
export const menuItems = [
    {
        link: "myprofile",
        name: "Profile",
        icon: UserRound
    },

    {
        link: "orders",
        name: "Orders",
        icon: ShoppingBag,
    },
    {
        link: "wishlist",
        name: "Wishlist",
        icon: Heart,
    },
];

//! admin menu option  if the user is authenticated and is  admin 
export const adminMenu = [
    {
        link: 'dashbord',
        name: 'Dashbord',
        icon: LayoutDashboard
    },
    {
        link: 'contact',
        name: 'contact',
        icon: LayoutDashboard
    }
]